---
namespace: others
language: zh-CN
key: cert_error_markdown
---

发生了一个证书错误。这可能是因为你正在使用一个带有自签证书的代理，或者你正在遭到中间人攻击。

这个证书被 **{{name}}** 签发，它的 sha256 特征值为 **{{value}}**.

选择 `信任` 将会允许所有使用了这个证书的链接，否则它们将继续被拦截

请在这些证书的发布者是受信任的（比如，你的代理的提供商）情况下选择信任他们

如果你在使用带有自签证书的代理，推荐直接导入代理提供的根证书而非在这里允许链接。详情请咨询代理客服。
