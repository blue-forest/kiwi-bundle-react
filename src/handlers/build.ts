import { Environment } from "dropin-recipes"
import Webpack from "webpack"
import { KiwiBundleBuildHandler } from "../.bundles/kiwi-bundle/handlers"
import { webpackConsoleLog } from "./utils"
import { generateWebpackConfig } from "./webpack/config"

export const main: KiwiBundleBuildHandler = ({ path, outDir, options, handlers }) => {
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