module.exports = {
  use: [
    '@neutrinojs/airbnb',
    [
      '@neutrinojs/react',
      {
        html: {
          title: 'Sophia',
          scripts: [{
            src: "https://use.fontawesome.com/releases/v5.0.13/js/all.js",
            integrity: "sha384-xymdQtn1n3lH2wcu0qhcdaOpQwyoarkgLVxC/wZ5q7h9gHtxICrpcaSUfygqZGOe",
            crossorigin: "anonymous",
          }],
        }
      }
    ],
    ['@neutrinojs/style-loader', {
      loaders: [{
        loader: 'sass-loader',
        useId: 'sass',
      }],
      test: /\.(sass)$/,
    }],
    '@neutrinojs/jest',
    neutrino => neutrino.config.output.publicPath('/'),
  ],
};
