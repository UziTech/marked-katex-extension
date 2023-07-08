# marked-katex-extension

Render [katex](https://katex.org/) code in marked

```markdown
This is inline katex: $c = \\pm\\sqrt{a^2 + b^2}$

This is block level katex:

$$
c = \\pm\\sqrt{a^2 + b^2}
$$
```

You will still need to include the css in your html document to allow katex styles.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" integrity="sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn" crossorigin="anonymous">
```

# Usage

```js
import {marked} from "marked";
import markedKatex from "marked-katex-extension";

// or UMD script
// <script src="https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/marked-katex-extension/lib/index.umd.js"></script>

const options = {
  throwOnError: false
};

marked.use(markedKatex(options));

marked.parse("katex: $c = \\pm\\sqrt{a^2 + b^2}$");
```

![image](https://user-images.githubusercontent.com/97994/188899567-e6e8268c-209e-4067-8f44-0ada16caacdd.png)

## Block level

You can include newlines in block level katex. Block level katex must contain starting and ending delimiters on their own line.

```js
marked.parse(`
$$
\\begin{array}{cc}
   a & b \\\\
   c & d
\\end{array}
$$
`);
```

## DisplayMode

[`displayMode`](https://katex.org/docs/options.html) will be on by default when using two dollar signs (`$$`) in inline or block katex. And it will be off by default for a single dollar sign (`$`) in inline or block katex.

## `options`

Options are sent directly to [`katex`](https://katex.org/docs/options.html)
