const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: 'bundle.js'
    },
    watch: true //Igual que nodemon. Hace que los archivos se recompilen al guardarse los cambios
};