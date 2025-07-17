import * as esbuild from 'esbuild';
import http from 'http';
import { readdirSync } from 'fs';
import { join, sep } from 'path';

const BUILD_DIRECTORY = 'dist';
const SERVE_PORT = 3000;
const PRODUCTION = process.env.NODE_ENV === 'production';
const ENTRY_POINTS = ['src/index.js', 'src/styles/styles.css'];
const SERVE_ORIGIN = `http://localhost:${SERVE_PORT}`;
const LIVE_RELOAD = !PRODUCTION;

const context = await esbuild.context({
  bundle: true,
  entryPoints: ENTRY_POINTS,
  outdir: BUILD_DIRECTORY,
  minify: PRODUCTION,
  sourcemap: !PRODUCTION,
  target: PRODUCTION ? 'es2020' : 'esnext',
  inject: LIVE_RELOAD ? ['./bin/live-reload.js'] : undefined,
  define: {
    SERVE_ORIGIN: JSON.stringify(SERVE_ORIGIN),
  },
});

if (PRODUCTION) {
  await context.rebuild();
  context.dispose();
} else {
  const { host, port } = await context.serve({
    servedir: BUILD_DIRECTORY,
    port: 0, // Use any free port (will proxy below)
  });

  const proxyServer = http.createServer((req, res) => {
    // ✅ Add CORS headers for all requests
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // ✅ Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
      res.writeHead(204); // No Content
      res.end();
      return;
    }

    // ✅ Forward all other requests
    const proxyReq = http.request(
      {
        hostname: host,
        port: port,
        path: req.url,
        method: req.method,
        headers: req.headers,
      },
      (proxyRes) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res, { end: true });
      }
    );

    req.pipe(proxyReq, { end: true });
  });

  proxyServer.listen(SERVE_PORT, () => {
    console.log(`🚀 Dev server running at: ${SERVE_ORIGIN}`);
    logServedFiles();
  });
}

function logServedFiles() {
  const getFiles = (dirPath) => {
    const files = readdirSync(dirPath, { withFileTypes: true }).map((dirent) => {
      const path = join(dirPath, dirent.name);
      return dirent.isDirectory() ? getFiles(path) : path;
    });

    return files.flat();
  };

  const files = getFiles(BUILD_DIRECTORY);

  const filesInfo = files
    .map((file) => {
      if (file.endsWith('.map')) return;

      const paths = file.split(sep);
      paths[0] = SERVE_ORIGIN;

      const location = paths.join('/');

      const tag = location.endsWith('.css')
        ? `<link href="${location}" rel="stylesheet" type="text/css"/>`
        : `<script defer src="${location}"></script>`;

      return {
        'File Location': location,
        'Import Suggestion': tag,
      };
    })
    .filter(Boolean);

  console.table(filesInfo);
}
