const { webpackConfig } = require('@abcnews/webpacker');

let config = webpackConfig();

config.resolve = {
    alias: {
        react: 'preact-compat',
        'react-dom': 'preact-compat'
    }
};

module.exports = config;
