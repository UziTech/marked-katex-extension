import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/index.ts',
    output: {
      name: 'markedKatex',
      file: 'lib/index.umd.js',
      format: 'umd',
      globals: {
        marked: 'marked',
        katex: 'katex',
      },
    },
    plugins: [nodeResolve(), typescript()],
    external: ['marked', 'katex'],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'lib/index.cjs',
      format: 'cjs',
    },
    plugins: [typescript()],
    external: ['marked', 'katex'],
  },
];
