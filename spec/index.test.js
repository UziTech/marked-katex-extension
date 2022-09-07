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
This is inline katex: $$c = \\pm\\sqrt{a^2 + b^2}$$
`,
    'block katex more $': `
This is block level katex:

$$$
c = \\pm\\sqrt{a^2 + b^2}
$$$
`,
    'block katex 1 $': `
This is block level katex:

$
c = \\pm\\sqrt{a^2 + b^2}
$
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
