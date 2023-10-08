import { runAllMarkedSpecTests } from '@markedjs/testutils';
import markedKatex from '../src/index.js';

runAllMarkedSpecTests({
  addExtension(marked) {
    marked.use(markedKatex());
  }
});
