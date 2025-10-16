import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import shelljs from 'shelljs';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

import pkg from './package.json';

let n8nProcess;
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: {
        'credentials/AlgoliaApi.credentials': 'credentials/AlgoliaApi.credentials.ts',
        'nodes/Algolia/Algolia.node': 'nodes/Algolia/Algolia.node.ts',
      },
      formats: ['cjs'],
    },
    emptyOutDir: true,
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      external: ['n8n-workflow', '@algolia/n8n-openapi-node'],
      output: {
        chunkFileNames: `${pkg.name}.[hash].js`,
      },
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'nodes/Algolia/*.{json,svg}',
          dest: '.',
          rename(_, __, fullPath) {
            const relativePathFromRoot = path.relative(process.cwd(), fullPath);
            return relativePathFromRoot.split(path.sep).join('/');
          },
        },
      ],
    }),
    {
      name: 'n8n',
      async closeBundle() {
        if (!this.meta.watchMode) {
          return;
        }

        if (n8nProcess) {
          n8nProcess.kill();
        }

        n8nProcess = shelljs.exec('n8n', { async: true }, (code, stdout, stderr) => {
          if (code !== 0) {
            this.warn(
              [
                '\nCould not start n8n for the following reason:',
                `→ ${stderr.trim()}`,
                '\nSet up local testing by following the instructions here:',
                '→ https://docs.n8n.io/integrations/creating-nodes/test/run-node-locally',
              ].join('\n'),
            );
          }
        });
      },
    },
  ],
});
