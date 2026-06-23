import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
  {
    input: 'src/index.js',
    output: {
      name: 'markedKatex',
      file: 'lib/index.umd.js',
      format: 'umd',
      globals: {
        marked: 'marked',
        katex: 'katex',
      },
    },
    plugins: [nodeResolve()],
    external: ['marked', 'katex'],
  },
  {
    input: 'src/index.js',
    output: {
      file: 'lib/index.cjs',
      format: 'cjs',
    },
    external: ['marked', 'katex'],
  },
];
