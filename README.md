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

# Usage

```js
const {marked} = require("marked");
const markedKatex = require("marked-katex-extension");

// or ES Module script
// import marked from "https://cdn.jsdelivr.net/gh/markedjs/marked/lib/marked.esm.js";
// import markedKatex from "https://cdn.jsdelivr.net/gh/UziTech/marked-katex-extension/lib/index.mjs";

const options = {
  throwOnError: false
};

marked.use(markedKatex(options));

marked("katex: $c = \\pm\\sqrt{a^2 + b^2}$");
```

![image](https://user-images.githubusercontent.com/97994/188899567-e6e8268c-209e-4067-8f44-0ada16caacdd.png)

## `options`

Options are sent directly to [`katex.renderToString`](https://katex.org/docs/api.html#server-side-rendering-or-rendering-to-a-string)
