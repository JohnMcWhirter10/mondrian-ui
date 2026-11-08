import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';
import pkg from './package.json';

const externals = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
];

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'mondrian-ui',
      formats: ['es', 'cjs'],
      fileName: (format) => `mondrian-ui.${format}.js`,
    },
    rollupOptions: {
      // Consumers install dependencies themselves, so none are bundled. Match
      // subpaths too (react/jsx-runtime, @radix-ui/react-slot/...).
      external: (id) =>
        externals.some((dep) => id === dep || id.startsWith(`${dep}/`)),
    },
    sourcemap: true,
    // Libraries ship readable code; the app that installs them minifies it.
    minify: false,
    cssMinify: true,
  },
});
