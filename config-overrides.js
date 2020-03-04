const { override, addBabelPlugins, getBabelLoader } = require('customize-cra');

const { styles } = require('@ckeditor/ckeditor5-dev-utils');

const fileLoaderMatcher = function(rule) {
  return rule.loader && rule.loader.indexOf(`file-loader`) !== -1;
};

function addPlugin(config) {
  config.module.rules[2].oneOf = [
    ...[
      /*---ckeditor5 webpack config start---*/
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
        use: ['raw-loader']
      },
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css/,
        use: [
          {
            loader: 'style-loader',
            options: {
              singleton: true
            }
          },
          {
            loader: 'postcss-loader',
            options: styles.getPostCssConfig({
              themeImporter: {
                themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
              },
              minify: true
            })
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css/
        // (...)
      }
      /*---ckeditor5 webpack config end---*/
    ],
    ...config.module.rules[2].oneOf
  ];

  // file-loader exclude
  let l = getBabelLoader(config, fileLoaderMatcher);
  let reg = /\.less$/;
  if (Array.isArray(l.exclude)) {
    l.exclude.push(reg);
  } else if (!!l.exclude) {
    l.exclude = [l.exclude, reg];
  } else {
    l.exclude = reg;
  }

  return config;
}

module.exports = override(
  ...addBabelPlugins(
    '@babel/plugin-transform-react-jsx',
    '@babel/plugin-transform-react-jsx-self'
  ),
  addPlugin
);
