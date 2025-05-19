import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',  // Your entry point
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      compact: true,
      minifyInternalExports: true,
      generatedCode: {
        preset: 'es5',
        arrowFunctions: false
      }
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm', 
      compact: true,
      minifyInternalExports: true,
      generatedCode: {
        preset: 'es5',
        arrowFunctions: false
      }
    }
  ],
  plugins: [
    json({
      compact: true,
      indent: ''
    }),        // Support for importing JSON files with minification
    typescript({
      tsconfig: './tsconfig.json',
      sourceMap: false
    })   // TypeScript plugin for handling .ts files
  ]
};
