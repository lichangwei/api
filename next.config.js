const withLess = require('@zeit/next-less');
const LessPluginAutoPrefix = require('less-plugin-autoprefix');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(
    withLess({
        webpack(config, { buildId, webpack }) {
            console.log(`buildId: ${buildId}`);
            config.module.rules.push({
                test: /\.(png|gif|jpg|ttf)$/,
                loader: 'url-loader?limit=20480&name=assets/[name]-[hash].[ext]',
            });
            config.module.rules.push({
                test: /\.svg$/,
                loaders: ['url-loader?limit=20480&name=assets/[name]-[hash].[ext]', 'svgo-loader'],
            });
            return config;
        },
        lessLoaderOptions: {
            math: 'strict',
            plugins: [
                new LessPluginAutoPrefix({
                    browsers: ['Android >= 4.3', 'iOS >= 7'],
                }),
            ],
        },
        pageExtensions: ['tsx'],
    })
);
