import typescript from 'rollup-plugin-typescript2'

const external = ['react', 'classnames', 'shortid', 'rc-tooltip']

export default [
  {
    input: './src/index.tsx',
    output: {
      file: './dist/es/index.js',
      format: 'es',
    },
    external,
    plugins: [
      typescript({
        typescript: require('typescript'),
        tsconfigOverride: {
          compilerOptions: {
            target: 'es2015',
            declaration: true,
          },
        },
      }),
    ],
  },
  {
    input: './src/index.tsx',
    output: {
      file: './dist/index.js',
      format: 'umd',
      name: 'index.js',
    },
    external,
    plugins: [
      typescript({
        typescript: require('typescript'),
        tsconfigOverride: {
          compilerOptions: {
            target: 'es5',
            lib: ['es6', 'dom'],
          },
        },
      }),
    ],
  },
]
