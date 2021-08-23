const path = require('path');

module.exports = {
    entry: "./src/index.tsx",
    output: {
		webassemblyModuleFilename: "[hash].wasm",
        // filename: "bundle.js",
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, "dist"),
        publicPath: "/dist/",
    },

    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',
    //     },
    // },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json", ".txt", ".wasm", ".png"]
    },

    module: {
        rules: [
            // WASM
            {
                test: /\.wasm$/,
                use: {
                    loader: 'wasm-loader'
                }
            },

            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    "@teamsupercell/typings-for-css-modules-loader",
                    {
                        loader: "css-loader",
                        options: { modules: true }
                    }
                  ]
            },

            {
                test: /\.(png|svg|jpg|gif|txt)$/,
                use: [
                    'file-loader',
                ]
            },
            
            // Load workers with worker-loader
            { test: /\.worker\.ts$/, loader: "worker-loader" },

            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            { test: /\.tsx?$/, loader: "ts-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
        ]
    },



    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },

    watch: true,
    watchOptions: {
        ignored: /node_modules/
    }
};