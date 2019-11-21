import WebpackDevServer from "webpack-dev-server"
import pathLib from "path"
import Webpack from "webpack"
import { readConfig } from "./config"
import generateWebpackConfig from "../webpack/config"
import { webpackConsoleLog } from "./utils"
import chalk from "chalk"
import { WebpackMode } from "../webpack/core"

export default (path: string) => {
  readConfig(path).then((kiwiConfig: any) => {
    const outputPath = pathLib.resolve(path, kiwiConfig.platforms.web.buildDir)
    const webpackConfig = generateWebpackConfig(path, outputPath, kiwiConfig, WebpackMode.DEVELOPMENT)
    const server = new WebpackDevServer(Webpack(webpackConfig), webpackConfig.devServer)
    webpackConsoleLog("Webpack launched for a watched development build...")
    server.listen(webpackConfig.devServer.port, webpackConfig.devServer.host, () => {
      webpackConsoleLog(
        `Development server will ba available at ` +
        chalk.bold(`http://${webpackConfig.devServer.host}:${webpackConfig.devServer.port}`)
      )
    })
    /*process.on("exit", () => {
      webpackConsoleLog("Webpack server stopped")
      server.close()
    })*/
  })
}
