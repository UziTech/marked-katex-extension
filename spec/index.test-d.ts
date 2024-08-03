import { marked } from 'marked';
import markedKatex from '../src/index.js';

const options = {
  throwOnError: false,
};

marked.use(markedKatex(options));

marked.parse('katex: $c = \\pm\\sqrt{a^2 + b^2}$');
