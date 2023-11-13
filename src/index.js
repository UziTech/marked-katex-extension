import katex from 'katex';

const inlineRule = /^(\${1,2})(?!\$)((?:\\.|[^\\\n])*?(?:\\.|[^\\\n$]))\1(?=[\s?!.,:？！。，：]|$)/;
const blockRule = /^(\${1,2})\n((?:\\[^]|[^\\])+?)\n\1(?:\n|$)/;
const alternativeInlineRule = /^\\\((?!\$)((?:\\.|[^\\\n])*?(?:\\.|[^\\\n$]))\\\)(?=[\s?!.,:？！。，：]|$)/;
const alternativeBlockRule = /^\\\[(\s*)((?:\\[^]|[^\\])+?)(\s*)\\](?:\n|$)/;

export default function(options = {}) {
  return {
    extensions: [
      inlineKatex(options, createRenderer(options, false)),
      blockKatex(options, createRenderer(options, true)),
      altInlineKatex(options, createRenderer(options, false)),
      altBlockKatex(options, createRenderer(options, true))
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
      let index;
      let indexSrc = src;

      while (indexSrc) {
        index = indexSrc.indexOf('$');
        if (index === -1) {
          return;
        }

        if (index === 0 || indexSrc.charAt(index - 1) === ' ') {
          const possibleKatex = indexSrc.substring(index);

          if (possibleKatex.match(inlineRule)) {
            return index;
          }
        }

        indexSrc = indexSrc.substring(index + 1).replace(/^\$+/, '');
      }
    },
    tokenizer(src) {
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
    tokenizer(src) {
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

function altInlineKatex(options, renderer) {
  return {
    name: 'altInlineKatex',
    level: 'inline',
    start(src) {
      let index;
      let indexSrc = src;

      while (indexSrc) {
        index = indexSrc.indexOf('\\(');
        if (index === -1) {
          return;
        }

        if (index === 0 || indexSrc.charAt(index - 1) === ' ') {
          const possibleKatex = indexSrc.substring(index + 1);

          if (possibleKatex.match(alternativeInlineRule)) {
            return index;
          }
        }

        indexSrc = indexSrc.substring(index + 2).replace(/^\\[()]/, '');
      }
    },
    tokenizer(src) {
      const match = src.match(alternativeInlineRule);
      if (match) {
        return {
          type: 'inlineKatex',
          raw: match[0],
          text: match[1].trim(),
          displayMode: false
        };
      }
    },
    renderer
  };
}

function altBlockKatex(options, renderer) {
  return {
    name: 'altBlockKatex',
    level: 'block',
    tokenizer(src) {
      const match = src.match(alternativeBlockRule);
      if (match) {
        return {
          type: 'blockKatex',
          raw: match[0],
          text: match[2].trim(),
          displayMode: true
        };
      }
    },
    renderer
  };
}
