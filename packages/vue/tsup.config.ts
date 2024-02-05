import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['cjs', 'esm'],
  clean: true,
  treeshake: true,
  dts: true,
  jsxFactory: 'h',
  jsxFragment: 'h',
  injectStyle: true,
})
