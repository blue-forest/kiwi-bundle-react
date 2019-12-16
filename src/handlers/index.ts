import { Environment } from "dropin-recipes"
import WebpackDevServer from "webpack-dev-server"
import Webpack from "webpack"
import chalk from "chalk"
import { KiwiBundleStartHandler, KiwiBundleBuildHandler } from "../.bundles/kiwi-bundle/handlers"
import { generateWebpackConfig } from "./webpack/config"

const webpackConsoleLog = (text: string) => {
  console.log(`${chalk.blue("ℹ")} ${chalk.gray("｢kwb｣")}: ${text}`)
}

export const start: KiwiBundleStartHandler = ({ path, outDir, options, handlers }) => {
  const webpackConfig = generateWebpackConfig(path, outDir, options, handlers, Environment.DEVELOPMENT)
  const server = new WebpackDevServer(Webpack(webpackConfig), webpackConfig.devServer)
  webpackConsoleLog("Webpack launched for a watched development build...")
  server.listen(webpackConfig.devServer.port, webpackConfig.devServer.host, () => {
    webpackConsoleLog(
      `Development server will ba available at ` +
      chalk.bold(`http://${webpackConfig.devServer.host}:${webpackConfig.devServer.port}`)
    )
  })
}

export const build: KiwiBundleBuildHandler = ({ path, outDir, options, handlers }) => {
  webpackConsoleLog("Webpack launched for production build...")
  Webpack(generateWebpackConfig(path, outDir, options, handlers, Environment.PRODUCTION), (err, stats) => {
    if(err) {
      console.error("Webpack error :", err)
      process.exit(1)
    } else {
      console.log(stats.toString({ colors: true }))
    }
  })
}
