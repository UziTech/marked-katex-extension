(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.thisExtension = factory());
})(this, (function () { 'use strict';

  function index(options = {}) {
    // extension code here

    return {
      tokenizer: {
        paragraph(src) {
          if (src !== 'example markdown') {
            return false;
          }

          const token = {
            type: 'paragraph',
            raw: src,
            text: 'example html',
            tokens: []
          };

          this.lexer.inline(token.text, token.tokens);

          return token;
        }
      }
    };
  }

  return index;

}));
