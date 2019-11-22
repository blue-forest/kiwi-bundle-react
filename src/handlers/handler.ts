import WebpackDevServer from "webpack-dev-server"
import pathLib from "path"
import Webpack from "webpack"
import generateWebpackConfig from "../webpack/config"
import chalk from "chalk"
import { WebpackMode } from "../webpack/core"

export default {

  start: (path: string) => {
    const outputPath = pathLib.resolve(path, )
    const webpackConfig = generateWebpackConfig(path, outputPath, kiwiConfig, WebpackMode.DEVELOPMENT)
    const server = new WebpackDevServer(Webpack(webpackConfig), webpackConfig.devServer)
    webpackConsoleLog("Webpack launched for a watched development build...")
    server.listen(webpackConfig.devServer.port, webpackConfig.devServer.host, () => {
      webpackConsoleLog(
        `Development server will ba available at ` +
        chalk.bold(`http://${webpackConfig.devServer.host}:${webpackConfig.devServer.port}`)
      )
    })
  },

  build: (path: string) => {
    webpackConsoleLog("Webpack launched for production build...")
      Webpack(generateWebpackConfig(path, outputPath, kiwiConfig, WebpackMode.PRODUCTION), (err, stats) => {
        if(err) {
          console.error("Webpack error :", err)
          process.exit(1)
        } else {
          console.log(stats.toString({ colors: true }))
        }
      })
  },

} as KiwiBundleHandler
