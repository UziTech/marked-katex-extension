# marked-katex-extension

Render [katex](https://katex.org/) code in marked

Note: Block level katex requires at least 2 `$` at the beginning and end.

```markdown
This is inline katex: $c = \\pm\\sqrt{a^2 + b^2}$

This is block level katex:

$$
c = \\pm\\sqrt{a^2 + b^2}
$$
```

You will still need to include the css in your html document to allow katex styles.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css" integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous">
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

## `options`

Options are sent directly to [`katex.renderToString`](https://katex.org/docs/api.html#server-side-rendering-or-rendering-to-a-string)
