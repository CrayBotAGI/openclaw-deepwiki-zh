import os
import asyncio
import logging
import argparse
from pathlib import Path
from datetime import datetime
from agno.agent import Agent
from agno.models.deepseek import DeepSeek

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(f"clean_docs_{datetime.now().strftime('%Y%m%d_%H%M%S')}.log", encoding='utf-8'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# 设置API密钥
os.environ["DEEPSEEK_API_KEY"] = ""

# 创建异步智能体
async_markdown_cleaner = Agent(
    model=DeepSeek(id="deepseek-chat"),
    instructions=[
        "你是一个专业的 Markdown 清理专家。你的任务是将输入的内容转换为标准、规范的 Markdown 格式。",
        "核心任务：",
        "1. 修复 Vue/VitePress 编译错误：识别所有非 HTML 标准的占位符（如 <channel>、<id>、<code>、<path-or-spec> 等），并将其包裹在反引号 ` 中，防止 Vue 编译器报错。",
        "2. 移除冗余内容：彻底删除所有“章节来源”、“图表来源”以及相关的非标准 HTML/注释区块。",
        "3. 保持功能性 HTML：保留 Mermaid 图表中的 <br/>，但清除其他干扰格式的 HTML 标签。",
        "4. 规范化格式：确保标题（#）前后有且仅有一个空行，修正列表缩进，确保代码块有正确的语言标识。",
        "5. 纯净输出：只返回清理后的纯 Markdown 内容，严禁包含任何解释、评价或开场白。"
    ],
    markdown=True
)

class ProgressTracker:
    def __init__(self, total):
        self.total = total
        self.current = 0
        self.success = 0
        self.failed = 0
        self.lock = asyncio.Lock()

    async def update(self, success=True):
        async with self.lock:
            self.current += 1
            if success:
                self.success += 1
            else:
                self.failed += 1
            percentage = (self.current / self.total) * 100
            logger.info(f"进度: {percentage:.1f}% ({self.current}/{self.total}) | 成功: {self.success} | 失败: {self.failed}")

async def async_clean_markdown_directory(root_dir, retry_failed=False):
    """
    批量处理Markdown文件，支持高并发和详细日志
    """
    root_path = Path(root_dir)
    if not root_path.exists():
        logger.error(f"目录不存在: {root_dir}")
        return
    
    # 排除备份文件
    all_md_files = [f for f in root_path.rglob("*.md") if not f.name.endswith(".md.backup") and f.is_file()]
    
    if retry_failed:
        # 只保留没有对应备份文件的文件（意味着之前没处理过或处理失败）
        md_files = [f for f in all_md_files if not f.with_suffix('.md.backup').exists()]
        logger.info(f"重试模式开启：从 {len(all_md_files)} 个文件中筛选出 {len(md_files)} 个未完成/失败的文件")
    else:
        md_files = all_md_files
    
    if not md_files:
        logger.warning("未找到需要处理的 .md 文件")
        return
    
    logger.info(f"准备处理 {len(md_files)} 个文件，开始高并发处理 (并发数: 20)...")
    tracker = ProgressTracker(len(md_files))
    
    async def process_file(file_path):
        retries = 3
        for attempt in range(retries):
            try:
                # 读取文件
                content = file_path.read_text(encoding='utf-8')
                if not content.strip():
                    logger.info(f"跳过空文件: {file_path}")
                    await tracker.update(success=True)
                    return True

                logger.info(f"正在处理 [{attempt + 1}/{retries}]: {file_path.name} ({len(content)} 字符)")

                # 清理内容 - 添加超时控制
                response = await asyncio.wait_for(
                    async_markdown_cleaner.arun(
                        f"请清理并修复以下 Markdown 内容，特别是转义类似 <placeholder> 的标签：\n\n{content}"
                    ),
                    timeout=120  # 增加到120秒超时
                )
                
                # 获取清理后的内容
                cleaned = response.content if hasattr(response, 'content') else str(response)
                
                if not cleaned or (len(cleaned.strip()) < 10 and len(content) > 100):
                    raise ValueError("生成的清理内容异常过短")

                # 备份并保存
                backup_path = file_path.with_suffix('.md.backup')
                if backup_path.exists():
                    backup_path.unlink()
                
                file_path.rename(backup_path)
                file_path.write_text(cleaned, encoding='utf-8')
                
                logger.info(f"成功修复: {file_path.name}")
                await tracker.update(success=True)
                return True
            except asyncio.TimeoutError:
                logger.warning(f"处理超时 {file_path.name} (尝试 {attempt + 1}/{retries})")
                if attempt == retries - 1:
                    logger.error(f"最终失败（超时）: {file_path.name}")
                    await tracker.update(success=False)
                    return False
                await asyncio.sleep(2 * (attempt + 1)) # 退避策略
            except Exception as e:
                logger.error(f"处理异常 {file_path.name} (尝试 {attempt + 1}/{retries}): {str(e)}")
                if attempt == retries - 1:
                    await tracker.update(success=False)
                    return False
                await asyncio.sleep(2 * (attempt + 1)) # 失败后稍作等待
        return False
    
    # 降低并发数以提高稳定性，防止 API 频率限制或网络拥塞
    semaphore = asyncio.Semaphore(5)
    
    async def bounded_process(file_path):
        async with semaphore:
            return await process_file(file_path)
    
    tasks = [bounded_process(file) for file in md_files]
    await asyncio.gather(*tasks, return_exceptions=True)
    
    logger.info("="*50)
    logger.info(f"任务完成！")
    logger.info(f"总文件数: {tracker.total}")
    logger.info(f"成功修复: {tracker.success}")
    logger.info(f"修复失败: {tracker.failed}")
    logger.info(f"详细日志已保存至同目录下的 .log 文件中")
    logger.info("="*50)

def clean_backups(root_dir):
    """
    清理所有 .md.backup 备份文件
    """
    root_path = Path(root_dir)
    if not root_path.exists():
        logger.error(f"目录不存在: {root_dir}")
        return

    backup_files = list(root_path.rglob("*.md.backup"))
    if not backup_files:
        logger.info("未找到需要清理的备份文件")
        return

    logger.info(f"发现 {len(backup_files)} 个备份文件，准备清理...")
    
    deleted_count = 0
    for backup_file in backup_files:
        try:
            backup_file.unlink()
            deleted_count += 1
        except Exception as e:
            logger.error(f"删除失败 {backup_file.name}: {e}")

    logger.info(f"清理完成: 成功删除 {deleted_count}/{len(backup_files)} 个备份文件")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Markdown 清理工具")
    parser.add_argument("--retry", action="store_true", help="仅重试失败的文件（没有对应 .md.backup 的文件）")
    parser.add_argument("--clean-backups", action="store_true", help="清理所有 .md.backup 备份文件")
    parser.add_argument("target_dir", nargs="?", default=None, help="指定要处理的目录 (可选)")
    args = parser.parse_args()

    # 确保在 docs 目录下运行，或者传入正确路径
    target_dir = args.target_dir if args.target_dir else os.path.dirname(os.path.abspath(__file__))
    
    if args.clean_backups:
        clean_backups(target_dir)
    else:
        asyncio.run(async_clean_markdown_directory(target_dir, retry_failed=args.retry))
