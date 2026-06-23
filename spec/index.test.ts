import { describe, test, beforeEach } from 'node:test';
import assert from 'node:assert';
import { marked } from 'marked';
import markedKatex, { type MarkedKatexOptions } from '../src/index.ts';
import { readFileSync } from 'node:fs';
import { resolve } from "node:path";

const specs = JSON.parse(readFileSync(resolve(import.meta.dirname, 'specs.json'), {encoding: 'utf-8'}));

interface Spec {
  name: string;
  source: string;
  options: MarkedKatexOptions;
  rendered: string;
  only?: boolean;
  skip?: boolean;
}

function normalize(str: string) {
  return str
    .replace(/<(\w+)([^>]*)><\/\1>/g, '<$1$2/>')
    .replace(/'|`|ˋ|ˊ|&quot;|&#x27;/g, '"')
    .replace(/\s|&nbsp;/g, '')
    .replace(/\\VERT|\\\|/ig, '|')
    .replace('"=""', '"/')
    .replace(/\\cr/g, '\\\\');
}

describe('marked-katex-extension', () => {
  beforeEach(() => {
    marked.setOptions(marked.getDefaults());
  });

  const snapshots: Record<string, string> = {
    'readme example': 'katex: $c = \\pm\\sqrt{a^2 + b^2}$',
    'inline katex': `
This is inline katex: $c = \\pm\\sqrt{a^2 + b^2}$
`,
    'block katex': `
This is block level katex:

$$
c = \\pm\\sqrt{a^2 + b^2}
$$
`,
    'inline katex more $': `
This is inline katex with displayMode: $$c = \\pm\\sqrt{a^2 + b^2}$$
`,
    'inline katex 3 $': `
This is not inline katex: $$$c = \\pm\\sqrt{a^2 + b^2}$$$
`,
    'block katex more $': `
This is not katex:

$$$
c = \\pm\\sqrt{a^2 + b^2}
$$$
`,
    'block katex 1 $': `
This is block level katex:

$
c = \\pm\\sqrt{a^2 + b^2}
$
`,
    'not katex': 'not katex $300 $400',
    'not katex at beginning': '$300 $400 not katex',
    'not katex at end': 'not katex 300$ 400$',
    'block katex with $ inside': `
$$
\\colorbox{aqua}{$
\\frac{b}{2}\\sqrt{a^2-\\frac{b^2}{4}}
a$}
$$
`,
    'inline katex with $ inside': 'this is inline katex: $a\\raisebox{0.25em}{$b$}c$',
    'inline katex with a question mark after': 'this is inline katex: $x$?',
    'inline katex with an exclamation mark after': 'this is inline katex: $x$!',
    'inline katex with a period after': 'this is inline katex: $x$.',
    'inline katex with a comma after': 'this is inline katex: $x$,',
    'inline katex with a colon after': 'this is inline katex: $x$:',
    'inline katex $$...$': 'this is not katex: $$a\\raisebox{0.25em}{$b$}c$',
    'inline katex $...$$': 'this is not katex: $a\\raisebox{0.25em}{$b$}c$$',
    'slash $': 'must include space between katex and end delimiter: $ \\$ $',
    'slash $ without spaces': 'no need to include space between katex and end delimiter anymore: $\\$$',
    'block slash $': `
this is block katex:

$$
\\$\\$
$$
`,
    'inline katex with newline': `
this is not katex: $
c = \\pm\\sqrt{a^2 + b^2}
$
`,
    'multiple inline katex $': `
this is katex: **pi:** $\\pi$ **theta:** $\\theta$
`,
    'multiple inline katex $$': `
this is katex: **pi:** $$\\pi$$ **theta:** $$\\theta$$
`,
    'multiple block katex $': `
# pi:

$
\\pi
$

# theta:

$
\\theta
$
`,
    'multiple block katex $$': `
# pi:

$$
\\pi
$$

# theta:

$$
\\theta
$$
`,
    '$ in code fence not katex': `
text on line before it
\`\`\`
$ cat README
Hello World!
\`\`\`
`,
    'does not break paragraph': `
text on line before it
$$
This is not katex since there is no blank line above it.
It is part of the previous paragraph.
$$
`,
  };

  const nonStandardSnapshots: Record<string, string> = {
    'non standard readme example': `
afdaf$x=x^2$4$x=x^2$

$$
x = x^2
$$
`,
    'without space before $ ': 'katex$c = \\pm\\sqrt{a^2 + b^2}$',
  };

  for (const name in nonStandardSnapshots) {
    test(name, (t) => {
      marked.use(markedKatex({
        nonStandard: true,
      }));
      const md = nonStandardSnapshots[name];
      t.assert.snapshot(marked(md));
    });
  }
  for (const name in snapshots) {
    test(name, (t) => {
      marked.use(markedKatex());
      const md = snapshots[name];
      t.assert.snapshot(marked(md));
    });
  }

  describe('specs', () => {
    const hasOnly = specs.some((s: Spec) => s.only);
    for (const s of specs) {
      if (hasOnly && !s.only) {
        continue;
      }
      const testFn = s.only ? test.only : (s.skip ? test.skip : test);
      testFn(`Specs: ${s.name}`, () => {
        marked.use(markedKatex(s.options));
        const delimiter = s.options.displayMode ? '$$' : '$';
        const multiline = s.source.includes('\n');
        const md = multiline ? `${delimiter}\n${s.source}\n${delimiter}` : `${delimiter} ${s.source} ${delimiter}`;
        const expected = multiline ? s.rendered : `<p>${s.rendered}</p>\n`;
        assert.strictEqual(normalize(marked(md, {async: false})), normalize(expected));
      });
    }
  });
});
