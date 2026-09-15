import { expectType } from 'tsd';
import { marked } from 'marked';
import type { MarkedExtension } from 'marked';
import markedKatex from 'marked-katex-extension';
import type { MarkedKatexOptions } from 'marked-katex-extension';

const options: MarkedKatexOptions = {
  throwOnError: false,
  nonStandard: true,
};

marked.use(markedKatex(options));

expectType<MarkedExtension>(markedKatex());
expectType<MarkedExtension>(markedKatex(options));
expectType<MarkedKatexOptions>(options);

marked.parse('katex: $c = \\pm\\sqrt{a^2 + b^2}$');
