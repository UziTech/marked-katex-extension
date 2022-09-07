import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: {
    name: 'markedKatex',
    file: 'lib/index.umd.js',
    format: 'umd'
  },
  plugins: [nodeResolve()]
};
