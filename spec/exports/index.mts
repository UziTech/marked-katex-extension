import katex from 'marked-katex-extension';
import type { MarkedKatexOptions } from 'marked-katex-extension';
import type { MarkedExtension } from 'marked';

const options: MarkedKatexOptions = {
  throwOnError: false,
  nonStandard: true,
};

katex() satisfies MarkedExtension;
katex(options) satisfies MarkedExtension;
