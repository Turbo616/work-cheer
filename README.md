# 上班鼓励器 WorkCheer

免费开源的 Mac / Windows 桌面小工具。实时收入、下班倒计时、工作进度、本月估算、自定义作息和加班时薪、窗口置顶。无需账号，数据只保存在本机，离线使用。

## 官网

https://work-cheer.1184360066yang.workers.dev/

介绍页参考用户指定页面的浅暖背景、绿色按钮、深色描边与错位阴影风格，提供在线试用和三个安装包入口。

## 下载

从本仓库 Releases 下载：Mac Apple 芯片选择 arm64，Intel 选择 x64；Windows 选择 exe。Mac 打开 dmg 后拖入 Applications，Windows 运行安装程序。

安装包未购买 Apple/Windows 商业签名证书。Mac 可能需要在“系统设置 → 隐私与安全性”允许打开；Windows 可能出现未知发布者提示。请核对下载来源与 SHA256，不要关闭系统安全保护。

## 收入计算

正常时薪 = 月薪 / 月计薪天数 / 每日有效工时。每日有效工时扣除休息。上班前不累计，休息暂停，下班后仅在配置加班时薪时累计。休息日按配置时薪与当天作息估算，下班后停止。月累计包含本月此前正常工作日的估算收入、今日收入、手动调整；不自动记录历史加班、请假或法定节假日。更改设置会重算本月估算。暂不支持跨夜班。仅用于鼓励与估算，不替代工资单。

## 开发

Node.js 22+。`npm ci`、`npm test`、`npm start`。`npm run dist -- --mac` 或 `npm run dist -- --win` 打包。GitHub Actions 在各自系统构建 Mac arm64/x64 与 Windows x64 安装包，推送版本标签触发。

## 隐私

无账户、无分析跟踪、无云端工资上传，应用不加载远程网页。卸载前可清除本机应用数据以删除设置。

MIT License

## 官网部署

编辑 `site/index.html`、`site/site.css` 与 `site/demo.js`，运行 `npm run site:build`，再使用已授权的 Cloudflare 账号运行 `npx wrangler deploy`。不要将访问密钥提交到仓库。
