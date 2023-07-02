import katex from 'katex';

const inlineStartRule = /(?<=\s|^)\$(?!\$)/;
const inlineRule = /^\$(?!\$)([^\n]+?)\$(?=\s|$)/;
const blockRule = /^\$\$\n((?:\\.|[^\\])+?)\n\$\$(?:\n|$)/;

export default function(options = {}) {
  return {
    extensions: [
      inlineKatex(options),
      blockKatex(options)
    ]
  };
}

function inlineKatex(options) {
  return {
    name: 'inlineKatex',
    level: 'inline',
    start(src) {
      const match = src.match(inlineStartRule);
      if (!match) {
        return;
      }

      const possibleKatex = src.substring(match.index);

      if (possibleKatex.match(inlineRule)) {
        return match.index;
      }
    },
    tokenizer(src, tokens) {
      const match = src.match(inlineRule);
      if (match) {
        return {
          type: 'inlineKatex',
          raw: match[0],
          text: match[1].trim()
        };
      }
    },
    renderer(token) {
      return katex.renderToString(token.text, options);
    }
  };
}

function blockKatex(options) {
  const blockOptions = { displayMode: true, ...options };

  return {
    name: 'blockKatex',
    level: 'block',
    start(src) { return src.indexOf('\n$$'); },
    tokenizer(src, tokens) {
      const match = src.match(blockRule);
      if (match) {
        return {
          type: 'blockKatex',
          raw: match[0],
          text: match[1].trim()
        };
      }
    },
    renderer(token) {
      return katex.renderToString(token.text, blockOptions);
    }
  };
}
