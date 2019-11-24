import { b5r, Environment } from "dropin-recipes"
import WebpackDevServer from "webpack-dev-server"
import Webpack from "webpack"
import chalk from "chalk"
import { KiwiBundleHandlers } from "./.bundles/kiwi-bundle/handlers"
import { generateWebpackConfig } from "./webpack/config"

const webpackConsoleLog = (text: string) => {
  console.log(`${chalk.blue("ℹ")} ${chalk.gray("｢kwb｣")}: ${text}`)
}

export default b5r.create<KiwiBundleHandlers>({

  start: (path, outputDir, options) => {
    const webpackConfig = generateWebpackConfig(path, outputDir, options, Environment.DEVELOPMENT)
    const server = new WebpackDevServer(Webpack(webpackConfig), webpackConfig.devServer)
    webpackConsoleLog("Webpack launched for a watched development build...")
    server.listen(webpackConfig.devServer.port, webpackConfig.devServer.host, () => {
      webpackConsoleLog(
        `Development server will ba available at ` +
        chalk.bold(`http://${webpackConfig.devServer.host}:${webpackConfig.devServer.port}`)
      )
    })
  },

  build: (path, outputDir, options) => {
    webpackConsoleLog("Webpack launched for production build...")
    Webpack(generateWebpackConfig(path, outputDir, options, Environment.PRODUCTION), (err, stats) => {
      if(err) {
        console.error("Webpack error :", err)
        process.exit(1)
      } else {
        console.log(stats.toString({ colors: true }))
      }
    })
  },

})
