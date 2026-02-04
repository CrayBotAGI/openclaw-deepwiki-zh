# API 参考

## 目录
1. [简介](#简介)
2. [项目结构](#项目结构)
3. [核心组件](#核心组件)
4. [架构总览](#架构总览)
5. [详细组件分析](#详细组件分析)
6. [依赖关系分析](#依赖关系分析)
7. [性能考量](#性能考量)
8. [故障排查指南](#故障排查指南)
9. [结论](#结论)
10. [附录](#附录)

## 简介
本文件为 OpenClaw 的完整 API 参考，覆盖以下方面：
- WebSocket API 规范：连接握手、消息帧格式、事件类型与实时交互模式
- HTTP API 接口：REST 风格端点、URL 模式、请求/响应模式与认证方法
- CLI 命令参考：可用命令、参数选项与使用示例
- 配置参数参考：配置键、默认值与示例配置
- 协议特定示例、错误处理策略、安全与速率限制
- 常见用例、客户端实现指南与性能优化技巧
- 调试工具与监控方法
- 已弃用功能的迁移指南与向后兼容性说明

## 项目结构
OpenClaw 的 API 相关能力主要由以下模块构成：
- 网关协议与服务端：定义 WebSocket 帧、方法与事件，提供服务端处理逻辑
- 客户端 SDK：封装连接、认证、事件回调与关闭码描述
- 浏览器路由分发：基于路径与方法的路由注册与分发
- 插件 HTTP 注册：插件可动态注册 HTTP 路由
- CLI 参数解析：命令行参数提取与校验
- 配置系统：认证配置、默认值与运行时覆盖
- 文档与代码生成：TypeBox 作为协议单源真相，驱动验证、导出与 Swift 代码生成

```mermaid
graph TB
subgraph "协议与服务端"
F["frames.ts<br/>帧与握手定义"]
E["error-codes.ts<br/>错误码"]
P["protocol/index.ts<br/>AJV 校验器"]
S["server-methods.ts<br/>方法注册与授权"]
MH["ws-connection/message-handler.ts<br/>消息处理"]
end
subgraph "客户端"
C["client.ts<br/>连接选项与关闭码"]
end
subgraph "HTTP 层"
BR["browser/routes/dispatcher.ts<br/>浏览器路由分发"]
HR["plugins/http-registry.ts<br/>插件 HTTP 注册"]
end
subgraph "CLI"
AR["cli/argv.test.ts<br/>参数解析示例"]
CO["cli/command-options.ts<br/>选项检测"]
end
subgraph "配置"
AT["config/types.auth.ts<br/>认证配置"]
DF["config/defaults.ts<br/>默认值"]
RO["config/runtimes-overrides.ts<br/>运行时覆盖"]
CS["gateway/protocol/schema/config.ts<br/>配置接口模式"]
SC["apps/macos/Sources/OpenClaw/ConfigSchemaSupport.swift<br/>配置 UI 提示"]
end
F --> P
P --> S
S --> MH
C --> F
BR --> HR
AR --> CO
AT --> DF
DF --> RO
CS --> SC
```

## 核心组件
- WebSocket 协议与帧模型：定义连接握手参数、握手成功响应、请求/响应/事件三类帧，以及错误形状与协议版本策略
- 服务端方法注册与授权：聚合核心方法处理器，按客户端权限进行授权检查
- 客户端 SDK：提供连接选项、事件回调、关闭码语义化提示
- HTTP 路由与插件注册：支持浏览器路由分发与插件动态注册 HTTP 路由
- CLI 参数解析：提供参数提取、正整数校验与显式来源判断
- 配置系统：认证配置、默认值注入、运行时覆盖与配置模式导出

## 架构总览
下图展示从客户端到服务端的典型交互流程，包括握手、心跳事件与方法调用。

```mermaid
sequenceDiagram
participant Client as "客户端"
participant Gateway as "网关服务端"
participant Handler as "消息处理器"
Client->>Gateway : "WS 连接"
Gateway->>Client : "req : connect"
Client->>Gateway : "res : hello-ok"
Gateway-->>Client : "event : tick"
Client->>Gateway : "req : health"
Gateway-->>Client : "res : health"
Note over Client,Gateway : "后续可调用方法并订阅事件"
```

## 详细组件分析

### WebSocket API 规范
- 连接处理
  - 客户端必须先发送连接请求帧，包含最小/最大协议版本、客户端标识、设备与权限等信息
  - 服务端返回握手成功响应，包含协议版本、服务器信息、特性列表、快照、策略与可选认证令牌
  - 握手成功后，服务端推送心跳事件，周期由策略中的心跳间隔决定
- 消息格式
  - 请求帧：包含类型、唯一 ID、方法名与可选参数
  - 响应帧：包含类型、对应请求 ID、布尔结果、成功载荷或错误形状
  - 事件帧：包含类型、事件名、可选序列号与状态版本
- 错误形状
  - 包含错误码、消息、细节、是否可重试与重试等待时间
- 实时交互模式
  - 心跳事件用于保活与同步
  - 事件帧可携带状态版本，便于客户端增量更新

```mermaid
classDiagram
class RequestFrame {
+string type
+string id
+string method
+any params
}
class ResponseFrame {
+string type
+string id
+boolean ok
+any payload
+ErrorShape error
}
class EventFrame {
+string type
+string event
+any payload
+number seq
+StateVersion stateVersion
}
class ErrorShape {
+string code
+string message
+any details
+boolean retryable
+number retryAfterMs
}
ResponseFrame --> ErrorShape : "可能包含"
```

### HTTP API 接口
- 浏览器路由分发
  - 支持 GET/POST/DELETE 方法注册，路径编译为正则匹配，参数名提取用于路由参数绑定
  - 未匹配到路由时返回 404 与错误体
- 插件 HTTP 注册
  - 插件可注册自定义 HTTP 路由，支持规范化路径与重复注册检测
  - 返回注销函数以便动态移除路由

```mermaid
flowchart TD
A["接收请求(method,path)"] --> B["规范化路径"]
B --> C["按方法查找匹配路由"]
C --> D{"找到匹配?"}
D -- 否 --> E["返回 404 Not Found"]
D -- 是 --> F["执行处理器(handler)"]
F --> G["返回响应"]
```

### CLI 命令参考
- 参数解析与校验
  - 支持带等号与缺失值的标志解析
  - 支持详细级别标志（如 `--verbose`/`--debug`）
  - 正整数标志值解析，非法值返回未定义
- 选项来源检测
  - 判断选项是否来自 CLI 显式传入，便于区分默认值与用户覆盖

```mermaid
flowchart TD
Start(["开始"]) --> Parse["解析标志(--flag, --flag=值, --flag)"]
Parse --> Verbose{"是否 --verbose/--debug?"}
Verbose -- 是 --> SetVerbose["设置详细级别"]
Verbose -- 否 --> Next["继续"]
Next --> PositiveInt{"是否正整数标志?"}
PositiveInt -- 是 --> SetInt["设置数值"]
PositiveInt -- 否 --> Skip["跳过或返回未定义"]
SetVerbose --> End(["结束"])
SetInt --> End
Skip --> End
```

### 配置参数参考
- 认证配置
  - 支持多种凭证模式：静态 API Key、可刷新 OAuth 凭证、静态 Bearer Token
  - 支持冷却策略：默认与按提供商的计费回退小时数、上限与失败窗口
- 默认值注入
  - 对代理并发与子代理并发等字段进行默认值注入，确保配置完整性
- 运行时覆盖
  - 支持通过路径定位覆盖配置项，提供移除覆盖的能力
- 配置模式导出
  - 导出配置模式与 UI 提示，包含标签、帮助、分组、顺序、敏感性与占位符等
- macOS 配置 UI 提示
  - 支持配置路径段、UI 提示结构与排序、高级设置标记与敏感字段

```mermaid
classDiagram
class AuthConfig {
+Record~string,AuthProfileConfig~ profiles
+Record~string,string[]~ order
+Cooldowns cooldowns
}
class AuthProfileConfig {
+string provider
+"api_key"|"oauth"|"token"| mode
+string email
}
class Cooldowns {
+number billingBackoffHours
+Record~string,number~ billingBackoffHoursByProvider
+number billingMaxHours
+number failureWindowHours
}
class Defaults {
+number maxConcurrent
+number subagents.maxConcurrent
}
class Overrides {
+applyConfigOverrides(cfg)
+unsetConfigOverride(path)
}
AuthConfig --> AuthProfileConfig : "包含"
AuthConfig --> Cooldowns : "包含"
Defaults <.. Overrides : "应用/移除"
```

### 方法与事件（服务端）
- 方法注册与授权
  - 核心方法处理器集中注册，按客户端权限进行授权检查
  - 未知方法返回无效请求错误
- 常见方法类别
  - 健康检查、聊天、会话、节点、技能、定时任务、设备、日志、系统、更新、向量唤醒等
- 事件类型
  - 心跳事件、关机事件、代理事件、聊天事件等

```mermaid
graph LR
CM["connectHandlers"] --> HM["healthHandlers"]
CM --> CH["chatHandlers"]
CM --> SH["sessionsHandlers"]
CM --> NH["nodeHandlers"]
CM --> AH["agentHandlers"]
CM --> GH["gatewayHandlers"]
CM --> EH["execApprovalsHandlers"]
CM --> DH["deviceHandlers"]
CM --> PH["cronHandlers"]
CM --> TH["ttsHandlers"]
CM --> BH["browserHandlers"]
CM --> WH["webHandlers"]
CM --> UH["updateHandlers"]
CM --> SYS["systemHandlers"]
```

### 客户端实现要点
- 连接选项
  - 支持指定网关地址、令牌、密码、实例 ID、客户端元数据、平台、模式、角色、作用域、能力、命令、权限、路径环境变量、设备身份、协议范围、TLS 指纹等
- 事件与回调
  - 支持握手完成、事件、断开、缺口检测等回调
- 关闭码语义
  - 提供常见关闭码的语义化提示，便于诊断

### 协议版本与兼容性
- 单一真相：TypeBox 模式作为协议单源真相，驱动运行时验证、JSON Schema 导出与 Swift 代码生成
- 版本策略：客户端声明最小/最大协议版本，服务端拒绝不匹配
- 前向兼容：Swift 模型保留未知帧类型，避免破坏旧客户端

## 依赖关系分析
- 协议层依赖
  - 协议模式导出 AJV 校验器，统一参数验证
  - 服务端方法注册依赖协议模式与错误码
- 客户端依赖
  - 客户端 SDK 依赖协议模式与错误码
- HTTP 层依赖
  - 浏览器路由分发依赖路径编译与参数提取
  - 插件 HTTP 注册依赖规范化路径与注册表
- 配置层依赖
  - 认证配置与默认值注入依赖运行时覆盖机制
  - 配置模式导出依赖 UI 提示结构

```mermaid
graph TB
PI["protocol/index.ts"] --> SM["server-methods.ts"]
PI --> CL["client.ts"]
PI --> ER["error-codes.ts"]
BRD["browser/routes/dispatcher.ts"] --> HR["plugins/http-registry.ts"]
CFG["config/types.auth.ts"] --> DEF["config/defaults.ts"]
DEF --> OVR["config/runtimes-overrides.ts"]
CFG --> CS["gateway/protocol/schema/config.ts"]
CS --> MAC["apps/macos/.../ConfigSchemaSupport.swift"]
```

## 性能考量
- 心跳与保活
  - 使用心跳事件维持连接活性，合理设置心跳间隔以平衡保活与网络负载
- 负载与缓冲
  - 依据策略中的最大载荷与缓冲字节限制，控制消息大小与队列长度
- 并发与限流
  - 代理与子代理并发默认值注入，避免过度并发导致资源争用
- 日志与可观测性
  - 使用日志尾部接口进行实时日志追踪，结合事件序列号与状态版本进行增量更新

[本节为通用指导，无需具体文件来源]

## 故障排查指南
- 关闭码语义
  - 常见关闭码含义（如正常关闭、异常关闭、策略违规、服务重启）有助于快速定位问题
- 错误码与错误形状
  - 使用标准错误码与错误形状，包含可重试标记与重试等待时间，便于客户端实现退避策略
- 认证与令牌
  - 通过钩子令牌提取逻辑，支持头部、查询参数与请求头等多种方式获取令牌
- 参数验证
  - 统一使用 AJV 校验器与格式化错误信息，便于定位参数问题

## 结论
OpenClaw 的 API 体系以 TypeBox 为协议单源真相，通过严格的帧模型、方法注册与授权、HTTP 路由与插件扩展、CLI 参数解析与配置系统，构建了高一致性与可维护性的通信框架。配合明确的错误处理与关闭码语义，能够支撑从桌面到移动端与插件生态的广泛场景。

[本节为总结，无需具体文件来源]

## 附录

### WebSocket 连接与消息处理流程
```mermaid
flowchart TD
Start(["连接建立"]) --> Connect["发送 req:connect"]
Connect --> Hello["接收 res:hello-ok"]
Hello --> Tick["接收 event:tick"]
Tick --> Ready["准备就绪"]
Ready --> MethodCall["发送 req:method(params)"]
MethodCall --> Resp["接收 res:method(payload|error)"]
Ready --> Subscribe["订阅 event:xxx"]
Subscribe --> Events["接收 event:xxx(payload,seq,stateVersion)"]
Events --> Ready
```

### HTTP 路由注册与分发
```mermaid
sequenceDiagram
participant Plugin as "插件"
participant Registry as "HTTP 注册表"
participant Dispatcher as "路由分发器"
Plugin->>Registry : "registerPluginHttpRoute(path, handler)"
Registry-->>Plugin : "返回注销函数"
Dispatcher->>Registry : "dispatch(req)"
Registry-->>Dispatcher : "匹配处理器或 404"
```

### 配置覆盖与导出
```mermaid
flowchart TD
A["原始配置(cfg)"] --> B["运行时覆盖(overrides)"]
B --> C["合并(applyConfigOverrides)"]
C --> D["导出配置模式(ConfigSchemaResponse)"]
D --> E["UI 提示(ConfigUiHint)"]
```