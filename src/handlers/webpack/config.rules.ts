import { WebpackConfig } from "./core"

export const configRules = new WebpackConfig([
  {
    test: /\.js$/,
    use: [ "babel-loader?cacheDirectory", "source-map-loader" ],
    exclude: /node_modules/,
  },
  {
    test: /\.tsx?$/,
    use: [ "babel-loader?cacheDirectory", "awesome-typescript-loader" ],
  },
  /*{
    test: /\.css$/,
    use: [
      "style-loader",
      { loader: "css-loader", options: { importLoaders: 1 } },
    ],
  },
  {
    test: /\.scss$/,
    loaders: [
      "style-loader",
      { loader: "css-loader", options: { importLoaders: 1 } },
      "sass-loader",
    ],
  },*/
  {
    test: /\.(jpe?g|png|gif|svg)$/i,
    loaders: [
      "file-loader?hash=sha512&digest=hex&name=static/images/[hash].[ext]",
      "image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false",
    ],
  },
  {
    test: /\.(mp4|mov)$/,
    loaders: [
      "file-loader?name=static/medias/[hash].[ext]",
    ],
  },
  {
    test: /\.(ttf|eot)$/,
    use: { loader: "file-loader", options: { name: "static/fonts/[hash].[ext]" } },
  },
  {
    test: /\.(woff|woff2)$/,
    use: { loader: "url-loader", options: { name: "static/fonts/[hash].[ext]", limit: 5000, mimetype: "application/font-woff" } },
  },
  {
    test: /.json$/,
    loader: "json-loader",
  }
])
