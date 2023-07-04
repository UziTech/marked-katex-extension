import katex from 'katex';

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
    start(src) { return src.indexOf('$'); },
    tokenizer(src, tokens) {
      const match = src.match(/^\$+((?:\n)?\S(?:.*\S)?(?:\n)?)\$+/);
      if (match) {
        return {
          type: 'inlineKatex',
          raw: match[0],
          text: match[1].trim()
        };
      }
    },
    renderer(token) {
      console.log('inline');
      return katex.renderToString(token.text, options);
    }
  };
}

function blockKatex(options) {
  return {
    name: 'blockKatex',
    level: 'block',
    start(src) { return src.indexOf('$$'); },
    tokenizer(src, tokens) {
      const match = src.match(/^\$\$+((?:\n)?\S(?:.*\S)?(?:\n)?)\$\$+(\n)?/);

      if (match) {
        return {
          type: 'blockKatex',
          raw: match[0],
          text: match[1].trim()
        };
      }
    },
    renderer(token) {
      console.log('block');
      return `${katex.renderToString(token.text, { ...options, displayMode: true })}`;
    }
  };
}
