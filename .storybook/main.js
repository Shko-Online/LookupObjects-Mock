const webpack = require('webpack');
const path = require('path');

/** @type { import('@storybook/html-webpack5').StorybookConfig } */
const config = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/html-webpack5",
    options: {},
  },
  staticDirs: ['./public'],
  webpackFinal: async (config) => {
      config.resolve.alias = config.resolve.alias || {};
      config.resolve.alias['react'] = path.resolve('./node_modules/react');
      config.resolve.alias['react-dom'] = path.resolve('./node_modules/react-dom');
      config.resolve.fallback = config.resolve.fallback || {};
      config.resolve.fallback['react/jsx-dev-runtime'] = path.resolve(
          './.storybook/react-jsx-dev-runtime.development.js',
      );
      config.resolve.fallback['react/jsx-runtime'] = path.resolve('./.storybook/react-jsx-runtime.production.min.js');

      config.plugins.push(
          new webpack.SourceMapDevToolPlugin({
              append: '\n//# sourceMappingURL=[url]',
              fileContext: './',
              filename: '[file].map',
          }),
      );
      // for (var i = 0; i < config.module.rules.length; i++) {
      //     if (config.module.rules[i].test && 'a.ts'.match(config.module.rules[i].test)) {
      //         // Ensure shared component of stories are transpiled.
      //         config.module.rules[i].include = config.module.rules[i].include || [];
      //         config.module.rules[i].include.push(path.resolve('../src'));
      //         config.module.rules[i].include.push(path.resolve('../__sample-components__'));
      //         config.module.rules[i].use[0].options.presets = [
      //             [
      //                 '@babel/preset-env',
      //                 {
      //                     shippedProposals: true,
      //                     useBuiltIns: 'usage',
      //                     corejs: '3',
      //                     targets,
      //                     modules,
      //                 },
      //             ],
      //             '@babel/preset-typescript',
      //             '@babel/preset-react',
      //             '@babel/preset-flow',
      //         ];
      //         config.module.rules[i].use[0].options.plugins = [
      //             [
      //                 '@babel/plugin-proposal-decorators',
      //                 {
      //                     legacy: true,
      //                 },
      //             ],
      //             '@babel/plugin-syntax-flow',
      //             ['@babel/plugin-proposal-class-properties', { loose: true }],
      //             ['@babel/plugin-proposal-private-methods', { loose: true }],
      //             ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
      //             '@babel/plugin-proposal-export-default-from',
      //             '@babel/plugin-syntax-dynamic-import',
      //             ['@babel/plugin-proposal-object-rest-spread', { loose: true, useBuiltIns: true }],
      //             'babel-plugin-macros',
      //             ['@emotion', { sourceMap: true, autoLabel: 'always' }],
      //         ];
      //         break;
      //     }
      // }

      return config;
  },
};
export default config;
