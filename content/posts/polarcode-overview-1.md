---
Title: 极化码理论基础（一）：概述
Date: 2025-09-23
Author: Derrick Linus
Tags:
  - 极化码
Column: 信道编码
Summary: 背景、核心思想、前置知识
---


本文将简要回顾极化码的两个核心量：互信息与 Bhattacharyya 参数，并用公式说明其物理含义。

行内公式示例：$H(X) = -\sum_i p_i \log_2 p_i$。

块级公式示例：

$$
Z(W) = \sum_{y \in \mathcal{Y}} \sqrt{ W(y\mid 0) \, W(y\mid 1) }
$$

多行对齐公式：

$$
\begin{aligned}
I(W) &= \sum_{y \in \mathcal{Y}} \sum_{x \in \{0,1\}} \frac{1}{2} \, W(y\mid x) \, \log_2 \frac{W(y\mid x)}{\tfrac{1}{2}W(y\mid 0)+\tfrac{1}{2}W(y\mid 1)} \\
Z(W) &= \sum_{y} \sqrt{W(y\mid 0)W(y\mid 1)}
\end{aligned}
$$

## 1. 极化码概述（一级标题）

极化码是由 Erdal Arıkan 于 2009 年提出的一类容量可达的信道编码。其核心在于通过信道极化（channel polarization）将一组等价信道变换为“好信道”和“坏信道”的组合。

### 1.1 基本思想（二级标题）

通过递归构造与比特通道重排，实现信道容量在极限意义上的两极分化。实际编码时对“好信道”发送信息，对“坏信道”发送冻结比特。

#### 1.1.1 关键量（三级标题）

互信息 $I(W)$ 度量可传输的信息量；Bhattacharyya 参数 $Z(W)$ 度量可判别性，与误码率相关。

正文段落示例：极化码在短码长下可与 CRC 结合（CA-Polar）配合 SCL/SC-Flip 等译码器，在诸多标准（如 5G 控制信道）上得到应用。