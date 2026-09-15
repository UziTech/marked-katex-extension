import { rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';

rmSync('lib/types', { recursive: true, force: true });
rmSync('lib/index.d.ts', { force: true });
rmSync('lib/index.d.ts.map', { force: true });

const require = createRequire(import.meta.url);
const tsc = require.resolve('typescript/bin/tsc');

const result = spawnSync(process.execPath, [tsc, '-p', 'tsconfig.types.json'], {
  stdio: 'inherit',
});

process.exit(result.status ?? 1);
