const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        firebase: './src/firebase.js'
    },
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: '[name].js'
    }
};