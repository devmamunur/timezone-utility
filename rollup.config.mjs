import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',  // Your entry point
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',  // CommonJS format
      sourcemap: true
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',  // ES module format
      sourcemap: true
    }
  ],
  plugins: [
    json(),        // Support for importing JSON files
    typescript()   // TypeScript plugin for handling .ts files
  ]
};
