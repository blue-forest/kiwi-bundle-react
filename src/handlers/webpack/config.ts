import { Environment } from "dropin-recipes"
import Webpack from "webpack"
import pathLib from "path"
import { KiwiBundleHandlersOptions } from "../../.bundles/kiwi-bundle/handlers"
import { configRules } from "./config.rules"
import { configPlugins } from "./config.plugins"

const TSConfig = require("../../../tsconfig.json")

interface WebpackConfig extends Webpack.Configuration {
  entry: any
  output: any
  devServer?: any
  optimization: any
}

const generateJsOutputPath = (env: Environment, data?: any) => {
  const isSw = typeof data !== "undefined" && data.chunk.name === "sw"
  const isProd = env === Environment.PRODUCTION
  return `${isSw ? "" : "static/"}[name].${isProd ? "[contenthash].min" : "[hash]"}.js`
}

export const generateWebpackConfig = (rootPath: string, outputDir: string, options: KiwiBundleHandlersOptions, env: Environment): WebpackConfig => {
  const bundlePath = pathLib.join(rootPath, "node_modules", "kiwi-bundle-react")

  // Common config
  const config: WebpackConfig = {
    mode: env === Environment.PRODUCTION ? "production" : "development",

    resolve: {
      extensions: [ ".ts", ".tsx", ".js" ],
      modules: [
        pathLib.join(rootPath, "node_modules"),
        // pathLib.join(bundlePath, "node_modules"),
      ],
      /*alias: {
        "kiwi-bundle": bundlePath,
      },*/
    },

    resolveLoader: {
      extensions: [ ".ts", ".tsx", ".js" ],
      modules: [
        pathLib.join(rootPath, "node_modules"),
        // pathLib.join(bundlePath, "node_modules"),
      ],
    },

    entry: {
      main: [ pathLib.join(rootPath, "src", "index.ts") ],
      sw: pathLib.join(bundlePath, TSConfig.compilerOptions.outDir, "sw", "index.js"),
    },

    output: {
      filename: (data: any) => generateJsOutputPath(env, data),
      chunkFilename: generateJsOutputPath(env),
      globalObject: "(typeof self !== 'undefined' ? self : this)",
      publicPath: "/",
      path: pathLib.join(rootPath, outputDir),
    },

    module: {
      rules: configRules.generate(env),
    },

    plugins: configPlugins(rootPath, bundlePath, options).generate(env),

    devtool: env === Environment.PRODUCTION ? "source-map" : "eval",

    performance: {
      hints: false,
    },

    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            chunks: "all",
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
          },
        },
      },
    },
  }

  // Mode options
  if(env === Environment.DEVELOPMENT) {

    // DEV SERVER & HOT RELOADER ENTRIES
    config.entry.main.unshift("webpack/hot/only-dev-server")
    config.entry.main.unshift(
      "webpack-dev-server/client"
        + `?http://${options.dev.webHost}:${options.dev.webPort}`
    )

    // DEV SERVER CONFIG
    config.devServer = {
      host: options.dev.webHost,
      port: options.dev.webPort,
      historyApiFallback: true, // Disable if HashRouter is used
      clientLogLevel: "warning",
      inline: true,
      progress: true,
      hot: true,
    }

  } else {

    // Fail out on first error
    config.bail = true

  }

  return config
}
