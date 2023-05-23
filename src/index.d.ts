
import type { marked } from 'marked'
import type { KatexOptions } from 'katex'

declare module 'marked-katex-extension' {
  function markedKatex(options: KatexOptions): marked.MarkedExtension

  export default markedKatex
}