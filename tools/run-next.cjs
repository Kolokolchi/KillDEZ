// Keep the existing 8080 default while honoring hosting providers' PORT setting.
const { spawnSync } = require('node:child_process');
const [command, ...args] = process.argv.slice(2);
if (!['dev', 'start'].includes(command)) throw new Error('Expected dev or start');
const result = spawnSync(process.execPath, [
  require.resolve('next/dist/bin/next'), command,
  '--port', process.env.PORT || '8080', ...args,
], { stdio: 'inherit', env: process.env });
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
