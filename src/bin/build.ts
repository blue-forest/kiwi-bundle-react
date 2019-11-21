import { readConfig } from "./config"
import pathLib from "path"
import rimraf from "rimraf"
import { webpackConsoleLog } from "./utils"
import Webpack from "webpack"
import generateWebpackConfig from "../webpack/config"
import { WebpackMode } from "../webpack/core"

export default (path: string) => {
  readConfig(path).then((kiwiConfig: any) => {
    const outputPath = pathLib.resolve(path, kiwiConfig.platforms.web.buildDir)
    rimraf(outputPath, (error) => {
      if(error) {
        console.error(error)
        process.exit(1)
      } else {
        webpackConsoleLog("Webpack launched for production build...")
        Webpack(generateWebpackConfig(path, outputPath, kiwiConfig, WebpackMode.PRODUCTION), (err, stats) => {
          if(err) {
            console.error("Webpack error :", err)
            process.exit(1)
          } else {
            console.log(stats.toString({ colors: true }))
          }
        })
      }
    })
  })
}
