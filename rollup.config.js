import typescript from 'rollup-plugin-typescript2';
export default {
  input: './libs/index.ts',
  output: [{
    file: './dist/index.js',
    format: 'cjs'
  }],
  plugins: [
    // nodeResolve({jsnext: true}),
    // commonjs(),
    // json(),
    typescript({
      tsconfigOverride: {
        comppilerOptions: {
          module: 'es2015',
          moduleResolution: 'node'
        }
      }
    })
  ]
}