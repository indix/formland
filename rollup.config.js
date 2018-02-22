import typescript from 'rollup-plugin-typescript2'

const external = ['react', 'classnames', 'rc-tooltip', 'dot-prop-immutable']

export default [
  {
    input: './src/index.tsx',
    output: {
      file: './es/index.js',
      format: 'es',
    },
    external,
    plugins: [
      typescript({
        typescript: require('typescript'),
        tsconfigOverride: {
          compilerOptions: {
            target: 'es2015',
          },
        },
      }),
    ],
  },
  {
    input: './src/index.tsx',
    output: {
      file: './lib/index.js',
      format: 'cjs',
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
