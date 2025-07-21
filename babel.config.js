module.exports = function babelConfig(api) {
    api.cache(true);
    return {
        presets: [
            '@babel/preset-typescript',
            '@babel/react',
            [
                '@babel/env',
                {
                    modules: false,
                    targets: {
                        node: '12',
                        browsers: ['last 2 versions'],
                    },
                },
            ],
        ],
        plugins: [],
        ignore: [
            'node_modules',
        ],
    };
};