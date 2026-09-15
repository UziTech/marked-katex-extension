import { existsSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';

function clean(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = join(dir, entry.name);
    if (entry.isDirectory()) {
      clean(file);
      if (readdirSync(file).length === 0) {
        rmSync(file, { recursive: true, force: true });
      }
    } else if (/\.d\.ts(\.map)?$/.test(entry.name)) {
      rmSync(file, { force: true });
    }
  }
}

if (existsSync('lib')) {
  clean('lib');
}

const require = createRequire(import.meta.url);
const tsc = require.resolve('typescript/bin/tsc');

const result = spawnSync(process.execPath, [tsc, '-p', 'tsconfig.types.json'], {
  stdio: 'inherit',
});

process.exit(result.status ?? 1);
