# CD Calculator 开发待办计划表（v1）

> 约束与共识
>
> - 语言：仅英文（EN-only），但仍使用 messages/en.ts 统一管理文本（便于后续扩展，避免硬编码）
> - 数据：首版不接入实时利率（不实现 Section: Rates）
> - 布局：单页多段（Single Page + Anchors）
> - 目标：移动端优先、重视内容质量、通过 AdSense 审核，避免低价值内容
> - 范围：先做主计算器 + 教程 + FAQ + 免责声明；罚金模块先评估价值后决策
>
> 里程碑建议（估时为开发纯实现，不含外部审批/采买）
>
> - M0 规划与信息架构（0.5d）
> - M1 核心 MVP（1.5–2d）：主计算器 + 教程 + FAQ + SEO 基础 + 免责声明
> - M2 决策与实现：提前支取罚金（0.5d 评估 + 1–1.5d 实现，若通过）
> - M3 阶梯策略（1.5–2d，次优先级）
> - M4 对比工具（1d，次优先级）
> - M5 合规/性能/分析（0.5–1d）
> - M6 上线与复盘（0.5d）

---

## 进度摘要（截至当前）

- ✅ 完成：单页结构与锚点（tool/howto/faq）、页面元信息、Footer 多语言键同步
- ✅ 完成：核心利息计算函数库（APY→ 周期利率、分数期次、金额四舍五入）
- ✅ 完成：主计算器 UI（移动端优先、表单与结果卡）
- ✅ 完成：WebApplication + HowTo JSON-LD；FAQ 组件自带 FAQPage schema
- ✅ 完成：FAQ 丰富至 10 项以上；HowTo 增补“公式与示例”段落
- ✅ 完成：HowTo 增补“常见误区”段落；复制结果按钮；aria-live 提示
- ✅ 完成：修复 Markdown 换行渲染（去除 \n 转义，改多行模板字符串）
- ✅ 完成：明细表（逐期）+ CSV 导出、税后估算开关（主计算器）
- 🚧 进行中：移动端/可访问性细节打磨（输入错误提示、焦点管理）、内容润色
- ⏳ 待决策：提前支取罚金模块（价值评估后）

---

## 0. 信息架构与页面骨架（M0）

- [x] 定义单页分段与锚点结构（Hero+Calculator, HowTo, Penalty(可选), Ladder(后续), Comparison(后续), FAQ, CTA）
- [x] 页面标题层级与可扫描性（仅一个 H1，分段 H2/H3）
- [x] Header/Footer 内容最小化（保留必要导航与法务链接）
- [x] 在 `src/messages/en.ts` 预留页面级命名空间键位（calculator/howto/faq/disclaimer/cta/common）
- [x] 确定文案风格与语气（清晰、可信、非投顾，不做夸大）

验收标准：页面骨架通过走查；无冗余段落；锚点可用；移动端首屏即见主计算器。

---

## 1. 文案与内容（高优先级，贯穿 M1）

- [x] Hero 文案（标题、副标题、简述、优势一行）
- [x] 教程（How to calculate CD interest）Markdown 版：
  - [x] 公式解释（APY → 周期利率、复利频率、到期本息）
  - [x] 分步示例（可核算、可复制）
  - [x] 注意事项与常见误区（利率 vs 收益率、复利频率影响）
- [x] FAQ（≥10 个高质量 Q&A，避免浅层堆砌，涵盖长尾 how-to 词）
- [x] 免责声明（非财务建议、仅供信息参考、风险提示）
- [x] CTA 文案（友好、非诱导、无夸张承诺）
- [x] 所有可见文本抽取至 `src/messages/en.ts`，避免硬编码

验收标准：

- 内容完整、清晰、可验证（示例可手算或用函数验证）；
- 句读与拼写无误，避免关键词堆砌；
- 通过主观“低价值内容”自检（每段信息有明确价值）。

---

## 2. 计算核心（纯函数库，M1）

新建 `src/lib/cd/`：

- [x] `types.ts`：Principal、APY、Term、Compounding、Result 类型
- [x] `interest.ts`：
  - [x] APY → 周期利率换算
  - [x] 支持复利频率（月/季/年）与单利（如有需要）
  - [x] 到期本息、总收益、有效收益率计算
  - [x] 数值稳定性与舍入规则（金融常用四舍五入到分）
- [ ] 单元测试计划（后补或以对照样例校验）：典型边界（0% APY、1 个月、非整年）

验收标准：给定样例输入，输出与手算结果一致；对边界输入有可预测结果或友好报错。

---

## 3. 主计算器 UI（M1）

- [x] 表单输入（移动端优化）：
  - [ ] 初始存款（number，默认 10,000）
  - [ ] APY（% ，默认 5.00）
  - [ ] 期限（月，默认 12）
  - [ ] 复利频率（Monthly/Quarterly/Annually）
- [x] 即时计算与结果卡片（本息合计、收益、有效年化）
- [ ] 交互细节：
  - [x] 输入验证与错误提示（空、负数、超大值防御）
  - [x] 清空/重置、复制结果
  - [x] a11y：label/aria、键盘可达、语义化（aria-live、aria-invalid、-describedby、基础焦点管理）
  - [x] 数字键盘（移动端 `inputmode`, `pattern`）
- [x] 无外部图表库（体积控制），必要时用简易条形可视元素

### 视觉与可读性优化（新增）

- [x] 标题去重：组件内去除重复的模块标题/描述，仅保留页面 Hero 标题
- [x] 金融配色反馈：
  - [x] Interest/Net：正值绿色、负值红色、零灰色
  - [x] Effective Yield：蓝色强调
  - [x] Penalty：红色强调、Refund：蓝色强调、Break‑even：紫色强调
### 计算增强（新增）
- [x] APY/APR 输入模式切换（APR→APY 按频率换算）
- [x] 复利频率扩展：Daily/Semi/Monthly/Quarterly/Annually
- [x] 快捷期限芯片（3/6/9/12/18/24/36/48/60）
- [x] 明细表（逐期）+ CSV 导出
- [x] 税后估算开关（税率%）

验收标准：表单可在移动端顺畅操作；无抖动；输入 200ms 内出结果；结果可复制。

---

## 4. SEO 与结构化数据（M1）

- [x] Metadata：Title、Description、OG、Twitter（英文）
- [x] JSON-LD：
  - [x] WebApplication（应用类）
  - [x] FAQPage（对应 FAQ）
  - [x] HowTo（对应教程章节）
- [x] 语义结构与内链锚点（返回顶部链接）
- [x] Canonical + alternates（统一为 EN/x-default）
- [x] Sitemap 清理旧路由，仅保留 /, /privacy, /terms, /disclaimer
- [x] robots（沿用模板配置，已复核）

验收标准：

- Google Rich Results Test 通过 FAQ/HowTo；
- 页面仅一个 H1；
- 重要关键词自然出现于 H1/H2/前 100 词。

---

## 5. 性能、移动端与可用性（M1/M5）

- [x] 移动端优先布局与触控区域（≥44px）
- [x] 表单与结果在首屏内可用（压缩 Hero 间距与整体内边距）
- [x] 无阻塞脚本与大依赖；首屏渲染快
- [ ] Lighthouse 目标（移动）：
  - [ ] Performance ≥ 90
  - [ ] Accessibility ≥ 95
  - [ ] Best Practices ≥ 90
  - [ ] SEO ≥ 95

### Lighthouse 检查结果（当前）

- 桌面（/en）：Performance 0.93、Accessibility 1.00、Best Practices 0.77、SEO 1.00（LCP 0.5 s、TBT 0 ms、Unused JS ~179 KiB）
- 移动（/en）：Performance 0.94、Accessibility 1.00、Best Practices 0.77、SEO 1.00（LCP 2.4 s、TBT 240 ms、Unused JS ~180 KiB）

### 针对移动端 Performance 的整改项（TBT/未用 JS）

- [x] 按需渲染 PenaltyCalculator（用户点击展开后再加载组件）
- [x] 按需渲染/零水合 FAQ（SSR 文案 + details/summary + FAQPage JSON-LD 服务端注入）
- [ ] 继续压缩未用 JS（目标 ≤ 10 KiB），审查 "use client" 边界与动态导入切分点
- [x] 复测移动端 Performance（0.94 ≥ 0.90）

## 11. 多语言（ES 首发）

- [x] 启用 locales：en、es（默认 en）
- [x] Header 恢复语言切换（EN/ES）
- [x] Alternates：首页与法务页加入 es hreflang
- [x] FAQ：SSR 文案 + JSON‑LD 随语言输出
- [ ] es 文案复核（术语统一：Inicio、Penalización、Composición 等）

验收标准：本地测评达标；无布局位移（CLS 可忽略级）。

---

## 6. 分析与合规（M5）

- [x] GA 事件（预埋）：calculate、copy_result（仅在配置 GA 时上报）
- [ ] 广告位策略（上线后再开）：
  - [ ] 避免首屏遮挡与误触；
  - [ ] 不影响主要任务流；
  - [ ] 仅在内容密度足够、体验良好后启用。
- [x] 法务页完善：Privacy、Terms、Disclaimer 文案（已按金融语境调整，终稿校对完成）

验收标准：事件在 GA 中可见；页面无诱导性内容；法务文本完整明确。

---

## 7. 决策点：提前支取罚金模块（M2）

价值评估（打分 0–2，合计 ≥6/10 则建议上线）：

- [x] 关键词机会：2（长尾约 1k/月，竞争适中）
- [x] 差异化空间：2（盈亏平衡 APY + 场景分析）
- [x] 实现成本：2（无外部依赖、与现有计算复用）
- [x] 内容厚度：2（教程与示例易扩展）
- [x] 转化潜力：1（提升停留与分享，保守计）

结论：合计 9/10 → 建议上线（已实现）。

实施清单：

- [x] `src/lib/cd/penalty.ts`：
  - [x] 已得利息、罚金（3 个月/6 个月/全部已获利息/自定义天数）
  - [x] 净收益、返还金额、盈亏平衡 APY（余下期限）
- [x] 组件：`PenaltyCalculator.tsx`（移动端优先 UI + 建议文案）
- [x] 教学文案：提前支取影响与判断（补充到教程章节）

验收标准：示例可复算；文案清晰不误导；不需要外部数据也能给到实用判断依据。

---

## 8. 阶梯策略（M3，次优先级）

- [ ] `src/lib/cd/ladder.ts`：资金分配、到期滚动、收益估算
- [ ] `LadderCalculator.tsx`：层数、最长期限、平均/自定义分配；简易可视化
- [ ] 文案：何时使用阶梯、优劣对比

验收标准：配置可一键生成；收益随层数/期限变化趋势符合直觉；文案解释清晰。

---

## 9. 对比工具（M4，次优先级）

- [ ] `src/lib/cd/compare.ts`：CD vs 储蓄/MM 的收益差异
- [ ] `Comparison.tsx`：输入两侧参数，输出收益差与建议
- [ ] 文案：不同账户类型的流动性与风险差异

验收标准：对比结果可被教程复核；不引入夸张承诺。

---

## 10. QA 与发布（M6）

- [ ] 自测用例清单（典型值与边界值）
- [ ] a11y 自检（键盘、朗读、对比度）
- [ ] SEO 校验（Rich Results、Meta/OG/Twitter）
- [ ] 构建与环境：`NEXT_PUBLIC_SITE_URL`、GA Measurement ID
- [ ] 上线前检查：无占位/假数据/空段落；文案最终校对
- [ ] 发布后监控：核心指标（PV、停留、计算次数、CTR）与回归缺陷清单

验收标准：构建零错误；核心链路稳定；上线一周数据达预期或给出改进计划。

---

## 交付产物一览

- 单页站点（EN）：主计算器、教程（Markdown）、FAQ、免责声明、CTA
- 计算核心库（纯函数，独立于 UI）
- 结构化数据（WebApplication/FAQPage/HowTo）
- GA 事件方案（不影响体验）
- （可选）罚金计算器与内容（通过价值评估后）

---

## 备注

- 为 AdSense 审核避免低价值：坚持“可验证、可复算、可学习”的内容标准；每节内容都帮助用户做出更好决策。
- 不引入实时利率与外部依赖，降低不确定性与维护成本。
- 虽为 EN-only，仍通过 `messages/en.ts` 管理可见文本，保留后续多语言空间。
