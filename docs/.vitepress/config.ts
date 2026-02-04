import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  title: 'OpenClaw DeepWiki',
  description: 'OpenClaw 深度文档',
  lang: 'zh-CN',
  base: '/openclaw-deepwiki-zh/',
  
  themeConfig: {
    nav: [
      { text: '快速开始', link: '/快速开始' },
      { text: '开发指南', link: '/开发者指南' },
      { text: '插件开发', link: '/插件开发' }
    ],

    sidebar: {
      '/': [
        {
          text: '入门指南',
          items: [
            { text: '快速开始', link: '/快速开始' },
            { text: '开发者指南', link: '/开发者指南' },
            { text: '插件开发', link: '/插件开发' }
          ]
        },
        {
          text: '项目概述',
          items: [
            { text: '项目概述', link: '/项目概述/项目概述.md' },
            { text: '核心价值与定位', link: '/项目概述/核心价值与定位.md' },
            { text: '快速开始指南', link: '/项目概述/快速开始指南.md' },
            {
              text: '技术架构概览',
              collapsed: true,
              items: [
                { text: '技术架构概览', link: '/项目概述/技术架构概览/技术架构概览.md' },
                { text: '整体架构设计', link: '/项目概述/技术架构概览/整体架构设计.md' },
                { text: '核心组件交互关系', link: '/项目概述/技术架构概览/核心组件交互关系.md' },
                { text: '系统边界与部署拓扑', link: '/项目概述/技术架构概览/系统边界与部署拓扑.md' },
                { text: '技术栈选型与决策', link: '/项目概述/技术架构概览/技术栈选型与决策.md' }
              ]
            },
            {
              text: '主要功能特性',
              collapsed: true,
              items: [
                { text: '主要功能特性', link: '/项目概述/主要功能特性/主要功能特性.md' },
                {
                  text: '多代理路由系统',
                  collapsed: true,
                  items: [
                    { text: '多代理路由系统', link: '/项目概述/主要功能特性/多代理路由系统/多代理路由系统.md' },
                    { text: '上下文传递', link: '/项目概述/主要功能特性/多代理路由系统/上下文传递.md' },
                    { text: '代理管理', link: '/项目概述/主要功能特性/多代理路由系统/代理管理.md' },
                    { text: '工作空间管理', link: '/项目概述/主要功能特性/多代理路由系统/工作空间管理.md' },
                    { text: '路由策略', link: '/项目概述/主要功能特性/多代理路由系统/路由策略.md' }
                  ]
                },
                {
                  text: '一流工具系统',
                  collapsed: true,
                  items: [
                    { text: '一流工具系统', link: '/项目概述/主要功能特性/一流工具系统/一流工具系统.md' },
                    { text: 'Canvas 渲染工具', link: '/项目概述/主要功能特性/一流工具系统/Canvas 渲染工具.md' },
                    { text: '定时任务工具', link: '/项目概述/主要功能特性/一流工具系统/定时任务工具.md' },
                    { text: '工具执行引擎', link: '/项目概述/主要功能特性/一流工具系统/工具执行引擎.md' },
                    { text: '插件化工具', link: '/项目概述/主要功能特性/一流工具系统/插件化工具.md' },
                    { text: '浏览器控制工具', link: '/项目概述/主要功能特性/一流工具系统/浏览器控制工具.md' },
                    { text: '节点操作工具', link: '/项目概述/主要功能特性/一流工具系统/节点操作工具.md' }
                  ]
                },
                {
                  text: '多渠道消息集成',
                  collapsed: true,
                  items: [
                    { text: '多渠道消息集成', link: '/项目概述/主要功能特性/多渠道消息集成/多渠道消息集成.md' },
                    { text: '企业通讯渠道', link: '/项目概述/主要功能特性/多渠道消息集成/企业通讯渠道.md' },
                    { text: '即时通讯渠道', link: '/项目概述/主要功能特性/多渠道消息集成/即时通讯渠道.md' },
                    { text: '消息路由与分发', link: '/项目概述/主要功能特性/多渠道消息集成/消息路由与分发.md' },
                    { text: '渠道插件架构', link: '/项目概述/主要功能特性/多渠道消息集成/渠道插件架构.md' },
                    { text: '渠道配置管理', link: '/项目概述/主要功能特性/多渠道消息集成/渠道配置管理.md' },
                    { text: '社交媒体渠道', link: '/项目概述/主要功能特性/多渠道消息集成/社交媒体渠道.md' }
                  ]
                },
                {
                  text: '网关控制平面',
                  collapsed: true,
                  items: [
                    { text: '网关控制平面', link: '/项目概述/主要功能特性/网关控制平面/网关控制平面.md' },
                    { text: 'WebSocket 协议规范', link: '/项目概述/主要功能特性/网关控制平面/WebSocket 协议规范.md' },
                    { text: '会话管理', link: '/项目概述/主要功能特性/网关控制平面/会话管理.md' },
                    { text: '消息路由', link: '/项目概述/主要功能特性/网关控制平面/消息路由.md' },
                    { text: '网关方法', link: '/项目概述/主要功能特性/网关控制平面/网关方法.md' },
                    { text: '连接管理', link: '/项目概述/主要功能特性/网关控制平面/连接管理.md' }
                  ]
                },
                {
                  text: '配套应用',
                  collapsed: true,
                  items: [
                    { text: '配套应用', link: '/项目概述/主要功能特性/配套应用/配套应用.md' },
                    { text: 'Android 应用', link: '/项目概述/主要功能特性/配套应用/Android 应用.md' },
                    { text: 'iOS 应用', link: '/项目概述/主要功能特性/配套应用/iOS 应用.md' },
                    { text: 'macOS 应用', link: '/项目概述/主要功能特性/配套应用/macOS 应用.md' },
                    { text: '共享组件库', link: '/项目概述/主要功能特性/配套应用/共享组件库.md' }
                  ]
                },
                { text: '实时 Canvas 工作空间', link: '/项目概述/主要功能特性/实时 Canvas 工作空间.md' },
                { text: '语音唤醒与对话模式', link: '/项目概述/主要功能特性/语音唤醒与对话模式.md' }
              ]
            },
            {
              text: '平台应用生态',
              collapsed: true,
              items: [
                { text: '平台应用生态', link: '/项目概述/平台应用生态/平台应用生态.md' },
                {
                  text: 'macOS 应用',
                  collapsed: true,
                  items: [
                    { text: 'macOS 应用', link: '/项目概述/平台应用生态/macOS 应用/macOS 应用.md' },
                    { text: 'WebChat 聊天界面', link: '/项目概述/平台应用生态/macOS 应用/WebChat 聊天界面.md' },
                    { text: '应用架构设计', link: '/项目概述/平台应用生态/macOS 应用/应用架构设计.md' },
                    { text: '打包与签名流程', link: '/项目概述/平台应用生态/macOS 应用/打包与签名流程.md' },
                    { text: '控制面板界面', link: '/项目概述/平台应用生态/macOS 应用/控制面板界面.md' },
                    { text: '系统集成与权限', link: '/项目概述/平台应用生态/macOS 应用/系统集成与权限.md' },
                    { text: '语音唤醒系统', link: '/项目概述/平台应用生态/macOS 应用/语音唤醒系统.md' },
                    { text: '调试工具集', link: '/项目概述/平台应用生态/macOS 应用/调试工具集.md' },
                    { text: '远程网关控制', link: '/项目概述/平台应用生态/macOS 应用/远程网关控制.md' }
                  ]
                },
                {
                  text: 'iOS 应用',
                  collapsed: true,
                  items: [
                    { text: 'iOS 应用', link: '/项目概述/平台应用生态/iOS 应用/iOS 应用.md' },
                    { text: 'Canvas 图形界面', link: '/项目概述/平台应用生态/iOS 应用/Canvas 图形界面.md' },
                    { text: '应用架构设计', link: '/项目概述/平台应用生态/iOS 应用/应用架构设计.md' },
                    { text: '状态监控系统', link: '/项目概述/平台应用生态/iOS 应用/状态监控系统.md' },
                    { text: '相机控制系统', link: '/项目概述/平台应用生态/iOS 应用/相机控制系统.md' },
                    { text: '网关通信协议', link: '/项目概述/平台应用生态/iOS 应用/网关通信协议.md' },
                    { text: '设置管理系统', link: '/项目概述/平台应用生态/iOS 应用/设置管理系统.md' },
                    { text: '语音触发系统', link: '/项目概述/平台应用生态/iOS 应用/语音触发系统.md' }
                  ]
                },
                {
                  text: 'Android 应用',
                  collapsed: true,
                  items: [
                    { text: 'Android 应用', link: '/项目概述/平台应用生态/Android 应用/Android 应用.md' },
                    { text: 'Canvas 图形界面', link: '/项目概述/平台应用生态/Android 应用/Canvas 图形界面.md' },
                    { text: '屏幕录制功能', link: '/项目概述/平台应用生态/Android 应用/屏幕录制功能.md' },
                    { text: '推拉模式交互', link: '/项目概述/平台应用生态/Android 应用/推拉模式交互.md' },
                    { text: '权限管理系统', link: '/项目概述/平台应用生态/Android 应用/权限管理系统.md' },
                    { text: '相机访问功能', link: '/项目概述/平台应用生态/Android 应用/相机访问功能.md' },
                    { text: '短信支持功能', link: '/项目概述/平台应用生态/Android 应用/短信支持功能.md' }
                  ]
                },
                {
                  text: '共享组件库',
                  collapsed: true,
                  items: [
                    { text: '共享组件库', link: '/项目概述/平台应用生态/共享组件库/共享组件库.md' },
                    { text: 'OpenClaw 协议层', link: '/项目概述/平台应用生态/共享组件库/OpenClaw 协议层.md' },
                    { text: 'OpenClaw 核心库', link: '/项目概述/平台应用生态/共享组件库/OpenClaw 核心库.md' },
                    { text: 'OpenClaw 聊天界面组件', link: '/项目概述/平台应用生态/共享组件库/OpenClaw 聊天界面组件.md' }
                  ]
                }
              ]
            },
            { text: '生态系统与合作伙伴', link: '/项目概述/生态系统与合作伙伴.md' }
          ]
        },
        {
          text: '核心概念',
          items: [
            { text: '核心概念', link: '/核心概念/核心概念.md' },
            {
              text: '智能代理系统',
              collapsed: true,
              items: [
                { text: '智能代理系统', link: '/核心概念/智能代理系统/智能代理系统.md' },
                { text: '代理核心引擎', link: '/核心概念/智能代理系统/代理核心引擎.md' },
                { text: '上下文管理系统', link: '/核心概念/智能代理系统/上下文管理系统.md' },
                { text: '工具执行系统', link: '/核心概念/智能代理系统/工具执行系统.md' },
                { text: '模型集成与适配', link: '/核心概念/智能代理系统/模型集成与适配.md' },
                { text: '并发控制机制', link: '/核心概念/智能代理系统/并发控制机制.md' }
              ]
            },
            {
              text: '会话管理机制',
              collapsed: true,
              items: [
                { text: '会话管理机制', link: '/核心概念/会话管理机制/会话管理机制.md' },
                { text: '会话生命周期', link: '/核心概念/会话管理机制/会话生命周期.md' },
                { text: '会话状态管理', link: '/核心概念/会话管理机制/会话状态管理.md' },
                { text: '会话路由策略', link: '/核心概念/会话管理机制/会话路由策略.md' },
                { text: '会话键生成与解析', link: '/核心概念/会话管理机制/会话键生成与解析.md' }
              ]
            },
            {
              text: '数据流与消息模式',
              collapsed: true,
              items: [
                { text: '数据流与消息模式', link: '/核心概念/数据流与消息模式/数据流与消息模式.md' },
                { text: '消息路由与分发', link: '/核心概念/数据流与消息模式/消息路由与分发.md' },
                { text: '异步处理与并发控制', link: '/核心概念/数据流与消息模式/异步处理与并发控制.md' },
                { text: '数据一致性与事务处理', link: '/核心概念/数据流与消息模式/数据一致性与事务处理.md' },
                { text: 'WebSocket 协议规范', link: '/核心概念/数据流与消息模式/WebSocket 协议规范.md' }
              ]
            },
            {
              text: '安全模型设计',
              collapsed: true,
              items: [
                { text: '安全模型设计', link: '/核心概念/安全模型设计/安全模型设计.md' },
                { text: '认证与授权机制', link: '/核心概念/安全模型设计/认证与授权机制.md' },
                { text: '权限管理机制', link: '/核心概念/安全模型设计/权限管理机制.md' },
                { text: '沙箱执行模型', link: '/核心概念/安全模型设计/沙箱执行模型.md' },
                { text: '网络安全协议', link: '/核心概念/安全模型设计/网络安全协议.md' },
                { text: '安全审计与监控', link: '/核心概念/安全模型设计/安全审计与监控.md' }
              ]
            },
            {
              text: '网关架构设计',
              collapsed: true,
              items: [
                { text: '网关架构设计', link: '/核心概念/网关架构设计/网关架构设计.md' },
                { text: 'HTTP API 设计', link: '/核心概念/网关架构设计/HTTP API 设计.md' },
                { text: 'WebSocket 协议设计', link: '/核心概念/网关架构设计/WebSocket 协议设计.md' },
                { text: '消息路由机制', link: '/核心概念/网关架构设计/消息路由机制.md' },
                { text: '组件生命周期管理', link: '/核心概念/网关架构设计/组件生命周期管理.md' },
                {
                  text: '插件系统架构',
                  collapsed: true,
                  items: [
                    { text: '插件系统架构', link: '/核心概念/网关架构设计/插件系统架构/插件系统架构.md' },
                    { text: '插件接口规范', link: '/核心概念/网关架构设计/插件系统架构/插件接口规范.md' },
                    { text: '插件清单与配置', link: '/核心概念/网关架构设计/插件系统架构/插件清单与配置.md' },
                    { text: '插件通信机制', link: '/核心概念/网关架构设计/插件系统架构/插件通信机制.md' }
                  ]
                }
              ]
            },
            {
              text: '配置管理机制',
              collapsed: true,
              items: [
                { text: '配置管理机制', link: '/核心概念/配置管理机制/配置管理机制.md' },
                { text: '配置文件结构设计', link: '/核心概念/配置管理机制/配置文件结构设计.md' },
                { text: '配置热重载机制', link: '/核心概念/配置管理机制/配置热重载机制.md' },
                { text: '运行时配置管理', link: '/核心概念/配置管理机制/运行时配置管理.md' },
                { text: '配置验证机制', link: '/核心概念/配置管理机制/配置验证机制.md' },
                { text: '配置迁移策略', link: '/核心概念/配置管理机制/配置迁移策略.md' }
              ]
            }
          ]
        },
        {
          text: '智能代理系统',
          items: [
            { text: '智能代理系统', link: '/智能代理系统/智能代理系统.md' },
            { text: '代理引擎', link: '/智能代理系统/代理引擎.md' },
            { text: '代理配置管理', link: '/智能代理系统/代理配置管理.md' },
            { text: '会话管理', link: '/智能代理系统/会话管理.md' },
            { text: '工具执行器', link: '/智能代理系统/工具执行器.md' },
            { text: '模型适配器', link: '/智能代理系统/模型适配器.md' },
            { text: '沙箱执行环境', link: '/智能代理系统/沙箱执行环境.md' }
          ]
        },
        {
          text: '技能平台',
          items: [
            { text: '技能平台', link: '/技能平台/技能平台.md' },
            { text: '技能架构原理', link: '/技能平台/技能架构原理.md' },
            { text: '技能配置管理', link: '/技能平台/技能配置管理.md' },
            { text: 'ClawHub 集成', link: '/技能平台/ClawHub 集成.md' },
            {
              text: '内置技能系统',
              collapsed: true,
              items: [
                { text: '内置技能系统', link: '/技能平台/内置技能系统/内置技能系统.md' },
                { text: '生产力工具技能', link: '/技能平台/内置技能系统/生产力工具技能.md' },
                { text: '开发工具类技能', link: '/技能平台/内置技能系统/开发工具类技能.md' },
                { text: '系统集成技能', link: '/技能平台/内置技能系统/系统集成技能.md' },
                { text: '媒体处理技能', link: '/技能平台/内置技能系统/媒体处理技能.md' },
                { text: '通信渠道技能', link: '/技能平台/内置技能系统/通信渠道技能.md' },
                { text: '娱乐与实用工具技能', link: '/技能平台/内置技能系统/娱乐与实用工具技能.md' }
              ]
            },
            {
              text: '技能开发指南',
              collapsed: true,
              items: [
                { text: '技能开发指南', link: '/技能平台/技能开发指南/技能开发指南.md' },
                { text: '技能开发工作流程', link: '/技能平台/技能开发指南/技能开发工作流程.md' },
                { text: '技能开发环境搭建', link: '/技能平台/技能开发指南/技能开发环境搭建.md' },
                { text: '技能项目结构规范', link: '/技能平台/技能开发指南/技能项目结构规范.md' },
                { text: '技能打包与分发', link: '/技能平台/技能开发指南/技能打包与分发.md' },
                { text: '技能测试与调试', link: '/技能平台/技能开发指南/技能测试与调试.md' }
              ]
            }
          ]
        },
        {
          text: '网关控制平面',
          items: [
            { text: '网关控制平面', link: '/网关控制平面/网关控制平面.md' },
            { text: '认证与授权', link: '/网关控制平面/认证与授权.md' },
            { text: 'HTTP API', link: '/网关控制平面/HTTP API.md' },
            { text: 'WebSocket API', link: '/网关控制平面/WebSocket API.md' },
            { text: '会话管理 API', link: '/网关控制平面/会话管理 API.md' },
            { text: '配置管理 API', link: '/网关控制平面/配置管理 API.md' }
          ]
        },
        {
          text: '渠道集成',
          items: [
            { text: '渠道集成', link: '/渠道集成/渠道集成.md' },
            {
              text: '支持的消息渠道',
              collapsed: true,
              items: [
                { text: '支持的消息渠道', link: '/渠道集成/支持的消息渠道/支持的消息渠道.md' },
                { text: 'Slack 渠道', link: '/渠道集成/支持的消息渠道/Slack 渠道.md' },
                { text: 'Discord 渠道', link: '/渠道集成/支持的消息渠道/Discord 渠道.md' },
                { text: 'Telegram 渠道', link: '/渠道集成/支持的消息渠道/Telegram 渠道.md' },
                { text: 'Microsoft Teams 渠道', link: '/渠道集成/支持的消息渠道/Microsoft Teams 渠道.md' },
                { text: 'Google Chat 渠道', link: '/渠道集成/支持的消息渠道/Google Chat 渠道.md' },
                { text: 'WhatsApp 渠道', link: '/渠道集成/支持的消息渠道/WhatsApp 渠道.md' },
                { text: 'Signal 渠道', link: '/渠道集成/支持的消息渠道/Signal 渠道.md' },
                { text: 'iMessage 渠道', link: '/渠道集成/支持的消息渠道/iMessage 渠道.md' },
                { text: '其他消息渠道', link: '/渠道集成/支持的消息渠道/其他消息渠道.md' }
              ]
            },
            { text: '消息路由与处理', link: '/渠道集成/消息路由与处理.md' },
            { text: '渠道配置管理', link: '/渠道集成/渠道配置管理.md' },
            { text: '渠道插件架构', link: '/渠道集成/渠道插件架构.md' },
            { text: '渠道开发指南', link: '/渠道集成/渠道开发指南.md' }
          ]
        },
        {
          text: '平台应用',
          items: [
            { text: '平台应用', link: '/平台应用/平台应用.md' },
            { text: '共享组件库', link: '/平台应用/共享组件库.md' },
            { text: 'Android 应用', link: '/平台应用/Android 应用.md' },
            {
              text: 'iOS 应用',
              collapsed: true,
              items: [
                { text: 'iOS 应用', link: '/平台应用/iOS 应用/iOS 应用.md' },
                { text: '应用架构', link: '/平台应用/iOS 应用/应用架构.md' },
                { text: '模型管理', link: '/平台应用/iOS 应用/模型管理.md' },
                { text: '状态指示', link: '/平台应用/iOS 应用/状态指示.md' },
                { text: '网关连接', link: '/平台应用/iOS 应用/网关连接.md' },
                { text: '聊天界面', link: '/平台应用/iOS 应用/聊天界面.md' },
                { text: '设置配置', link: '/平台应用/iOS 应用/设置配置.md' }
              ]
            },
            {
              text: 'macOS 应用',
              collapsed: true,
              items: [
                { text: 'macOS 应用', link: '/平台应用/macOS 应用/macOS 应用.md' },
                { text: '菜单栏应用', link: '/平台应用/macOS 应用/菜单栏应用.md' },
                { text: 'Mac CLI 工具', link: '/平台应用/macOS 应用/Mac CLI 工具.md' },
                { text: '网关发现', link: '/平台应用/macOS 应用/网关发现.md' },
                { text: '进程间通信', link: '/平台应用/macOS 应用/进程间通信.md' }
              ]
            }
          ]
        },
        {
          text: '工具与自动化',
          items: [
            { text: '工具与自动化', link: '/工具与自动化/工具与自动化.md' },
            { text: '自动化工作流程', link: '/工具与自动化/自动化工作流程.md' },
            { text: '定时任务系统', link: '/工具与自动化/定时任务系统.md' },
            { text: '节点操作工具', link: '/工具与自动化/节点操作工具.md' },
            { text: '浏览器控制工具', link: '/工具与自动化/浏览器控制工具.md' },
            { text: 'Canvas 渲染系统', link: '/工具与自动化/Canvas 渲染系统.md' }
          ]
        },
        {
          text: 'API 参考',
          items: [
            { text: 'API 参考', link: '/API 参考/API 参考.md' },
            { text: 'HTTP API', link: '/API 参考/HTTP API.md' },
            { text: 'WebSocket API', link: '/API 参考/WebSocket API.md' },
            { text: 'CLI 命令参考', link: '/API 参考/CLI 命令参考.md' },
            { text: '配置参数参考', link: '/API 参考/配置参数参考.md' }
          ]
        },
        {
          text: '安全与权限',
          items: [
            { text: '安全与权限', link: '/安全与权限/安全与权限.md' },
            { text: '认证与授权', link: '/安全与权限/认证与授权.md' },
            { text: '权限管理', link: '/安全与权限/权限管理.md' },
            { text: '沙箱安全', link: '/安全与权限/沙箱安全.md' },
            { text: '平台安全', link: '/安全与权限/平台安全.md' },
            { text: '安全审计', link: '/安全与权限/安全审计.md' }
          ]
        },
        {
          text: '运维与监控',
          items: [
            { text: '运维与监控', link: '/运维与监控/运维与监控.md' },
            { text: '网关运维', link: '/运维与监控/网关运维.md' },
            { text: '日志与监控', link: '/运维与监控/日志与监控.md' },
            { text: '性能优化', link: '/运维与监控/性能优化.md' },
            { text: '故障诊断', link: '/运维与监控/故障诊断.md' }
          ]
        }
      ]
    },

    search: {
      provider: 'local'
    }
  }
}))
