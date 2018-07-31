// import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import uglify from 'rollup-plugin-uglify';
// import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';

var env = process.env.NODE_ENV;

let external;
if (env === 'production') {
  external = ['prop-types'];
}

var config = {
  output: {
    format: 'umd',
    name: 'StandardResource',
  },

  external,

  plugins: [
    typescript(),
    // nodeResolve({
    //   jsnext: true,
    // }),
    // commonjs({
    //   include: 'node_modules/**',

    //   // explicitly specify unresolvable named exports
    //   // (see below for more details)
    //   // namedExports: { './module.js': ['foo', 'bar' ] },  // Default: undefined
    // }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
};

if (env === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
      },
    })
  );
}

export default config;
