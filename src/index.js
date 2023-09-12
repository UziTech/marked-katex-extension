import katex from 'katex';

const inlineStartRule = /(\s|^)\${1,2}(?!\$)/;
const inlineRule = /^(\${1,2})(?!\$)((?:\\.|[^\\\n])*?(?:\\.|[^\\\n\$]))\1(?=[\s?!\.,:]|$)/;
const blockRule = /^(\${1,2})\n((?:\\[^]|[^\\])+?)\n\1(?:\n|$)/;

export default function(options = {}) {
  return {
    extensions: [
      inlineKatex(options, createRenderer(options, false)),
      blockKatex(options, createRenderer(options, true))
    ]
  };
}

function createRenderer(options, newlineAfter) {
  return (token) => katex.renderToString(token.text, { ...options, displayMode: token.displayMode }) + (newlineAfter ? '\n' : '');
}

function inlineKatex(options, renderer) {
  return {
    name: 'inlineKatex',
    level: 'inline',
    start(src) {
      const match = src.match(inlineStartRule);
      if (!match) {
        return;
      }

      const index = match.index + match[1].length;
      const possibleKatex = src.substring(index);

      if (possibleKatex.match(inlineRule)) {
        return index;
      }
    },
    tokenizer(src, tokens) {
      const match = src.match(inlineRule);
      if (match) {
        return {
          type: 'inlineKatex',
          raw: match[0],
          text: match[2].trim(),
          displayMode: match[1].length === 2
        };
      }
    },
    renderer
  };
}

function blockKatex(options, renderer) {
  return {
    name: 'blockKatex',
    level: 'block',
    start(src) { return src.indexOf('\n$'); },
    tokenizer(src, tokens) {
      const match = src.match(blockRule);
      if (match) {
        return {
          type: 'blockKatex',
          raw: match[0],
          text: match[2].trim(),
          displayMode: match[1].length === 2
        };
      }
    },
    renderer
  };
}
