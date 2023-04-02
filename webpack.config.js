import HtmlWebpackPlugin from 'html-webpack-plugin'

export const entry = 'index.js'
export const output = {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
}
export const plugins = [
    new HtmlWebpackPlugin()
]