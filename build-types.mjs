import { existsSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

function clean(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = join(dir, entry.name);
    if (entry.isDirectory()) {
      clean(file);
    } else if (/\.d\.ts(\.map)?$/.test(entry.name)) {
      rmSync(file, { force: true });
    }
  }
}

if (existsSync('lib')) {
  clean('lib');
}

const result = spawnSync('tsc', ['-p', 'tsconfig.types.json'], {
  shell: true,
  stdio: 'inherit',
});

process.exit(result.status ?? 1);
