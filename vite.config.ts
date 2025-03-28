import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';

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
      external: [
        'react',
        'react-dom',
        '@radix-ui/react-slot',
        '@radix-ui/react-checkbox',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@radix-ui/react-slot': 'RadixSlot',
          '@radix-ui/react-checkbox': 'RadixCheckbox',
        },
      },
    },
    sourcemap: true,
    minify: 'terser',
  },
});
