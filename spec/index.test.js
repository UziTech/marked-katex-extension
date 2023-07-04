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
    'inline katex multiple lines': `
inline katex with multiple lines:

$
c = \\pm\\sqrt{a^2 + b^2}
$
`,
    'inline katex with another $...$ inside it': `
inline katex with another \`$...$\` inside it: $\\fcolorbox{red}{aqua}{$\\frac{b}{2}\\sqrt{a^2-\\frac{b^2}{4}}$}$`,
    'block katex': `
This is block level katex:

$$
c = \\pm\\sqrt{a^2 + b^2}
$$
`,
    'block katex without newline': `
block katex without newline:
$$c = \\pm\\sqrt{a^2 + b^2}$$
`,
    'block katex more $': `
This is block level katex:

$$$
c = \\pm\\sqrt{a^2 + b^2}
$$$
`,
    'block katex with another $...$ inside it': `
block katex with another \`$...$\` inside it:
$$
\\fcolorbox{red}{aqua}{$\\frac{b}{2}\\sqrt{a^2-\\frac{b^2}{4}}$}
$$
`
  };

  for (const name in snapshots) {
    test(name, () => {
      marked.use(markedKatex());
      const md = snapshots[name];
      expect(marked(md)).toMatchSnapshot();
    });
  }

  test('inline katex', () => {
    marked.use(markedKatex());
    const md = `
This is inline katex: $c = \\pm\\sqrt{a^2 + b^2}$
`;
    expect(marked(md)).toMatchSnapshot();
  });
});
