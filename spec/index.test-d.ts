import { marked } from 'marked';
import markedKatex from '../src/index.js';
import type { MarkedKatexOptions } from '../src/index.js';

const options: MarkedKatexOptions = {
  throwOnError: false,
  nonStandard: true,
};

marked.use(markedKatex(options));

marked.parse('katex: $c = \\pm\\sqrt{a^2 + b^2}$');
