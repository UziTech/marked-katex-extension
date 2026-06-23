import { runAllMarkedSpecTests } from '@markedjs/testutils';
import markedKatex from '../src/index.ts';

runAllMarkedSpecTests({
  addExtension(marked) {
    marked.use(markedKatex());
  },
});
