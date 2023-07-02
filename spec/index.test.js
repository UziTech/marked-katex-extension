import { marked } from 'marked';
import markedKatex from '../src/index.js';

describe('marked-katex-extension', () => {
  beforeEach(() => {
    marked.setOptions(marked.getDefaults());
  });

  const snapshots = {
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
This is not block level katex:

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
    'inline katex $$...$': 'this is not katex: $$a\\raisebox{0.25em}{$b$}c$',
    'inline katex $...$$': 'this is not katex: $a\\raisebox{0.25em}{$b$}c$$'
  };

  for (const name in snapshots) {
    test(name, () => {
      marked.use(markedKatex());
      const md = snapshots[name];
      expect(marked(md)).toMatchSnapshot();
    });
  }
});
