declare module 'marked-katex-extension' {
  function markedKatex(options?: import('katex').KatexOptions): import('marked').marked.MarkedExtension

  export default markedKatex
}