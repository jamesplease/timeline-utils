const { NODE_ENV } = process.env;

// Heads up! The TypeScript compiler handles most of the transpiling.
// To configure what sorts of features get transpiled away, refer to `tsconfig.json`

module.exports = {
  plugins: [NODE_ENV === 'test' && '@babel/transform-modules-commonjs'].filter(
    Boolean
  ),
};
