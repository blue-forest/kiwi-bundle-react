import { Environment } from "dropin-recipes"
import WebpackDevServer from "webpack-dev-server"
import Webpack from "webpack"
import { chalk } from "kiwi-bundle"
import { generateWebpackConfig } from "./webpack/config"
import { webpackConsoleLog } from "./utils"
import { KiwiBundleStartHandler } from "../.bundles/kiwi-bundle/handlers"

export const main: KiwiBundleStartHandler = ({ path, outDir, options, handlers }) => {
  const webpackConfig = generateWebpackConfig(path, outDir, options, handlers, Environment.DEVELOPMENT)
  const server = new WebpackDevServer(Webpack(webpackConfig) as any, webpackConfig.devServer)
  webpackConsoleLog("Webpack launched for a watched development build...")
  server.listen(webpackConfig.devServer.port, webpackConfig.devServer.host, () => {
    webpackConsoleLog(
      `Development server will ba available at ` +
      chalk.bold(`http://${webpackConfig.devServer.host}:${webpackConfig.devServer.port}`)
    )
  })
}
