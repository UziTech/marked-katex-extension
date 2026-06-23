import { spec } from 'node:test/reporters';
import { run } from 'node:test';
import process from 'node:process';

run({
  globPatterns: ['spec/**/*.test.js'],
  only: process.argv.includes('--only'),
  coverage: process.argv.includes('--cover'),
  coverageExcludeGlobs: ['spec/*', 'lib/*'],
  lineCoverage: 100,
  branchCoverage: 90,
  functionCoverage: 100,
})
  .on('test:fail', () => {
    process.exitCode = 1;
  })
  .compose(spec)
  .pipe(process.stdout);
