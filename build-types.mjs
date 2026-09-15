import { existsSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

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

const result = spawnSync(process.execPath, ['node_modules/typescript/lib/tsc.js', '-p', 'tsconfig.types.json'], {
  stdio: 'inherit',
});

process.exit(result.status ?? 1);
