const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
execFileSync(process.execPath, [require.resolve('expo/bin/cli'), 'export', '--platform', 'web', '--output-dir', 'dist-pages'], { cwd: root, stdio: 'inherit' });
fs.copyFileSync(path.join(root, 'cloudflare/pages/_worker.js'), path.join(root, 'dist-pages/_worker.js'));
fs.writeFileSync(path.join(root, 'dist-pages/_routes.json'), JSON.stringify({version:1,include:['/api/*'],exclude:[]}));
