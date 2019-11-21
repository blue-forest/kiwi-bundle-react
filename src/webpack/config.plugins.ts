import pathLib from "path"
import { CheckerPlugin } from "awesome-typescript-loader"
import StyleLintPlugin from "stylelint-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import AppManifestWebpackPlugin from "app-manifest-webpack-plugin"
import Webpack, { Compiler, IgnorePlugin } from "webpack"
import WebpackConfig from "./core"
import etag from "etag"

const generateIconsAndManifest = (kiwiConfig: any, path: string, dev: boolean) => {
  return new AppManifestWebpackPlugin({
    logo: pathLib.join(path, "assets", "logo.png"),
    prefix: "/static/icons/",
    output: "static/icons/",
    persistentCache: dev,
    inject: true,
    config: {
      appName: kiwiConfig.project.title,
      appDescription: kiwiConfig.project.description,
      lang: kiwiConfig.project.lang,
      developerName: kiwiConfig.project.author,
      display: "standalone",
      orientation: "portrait",
      start_url: "/?homescreen=1",
      icons: {
        favicons: true,
        android: !dev,
        appleIcon: !dev,
        appleStartup: !dev,
        firefox: !dev,
        twitter: !dev,
        windows: !dev,
        yandex: false,
        coast: false,
        opengraph: false,
      },
    }
  })
}

const generateKiwiJson = () => ({
  apply: (compiler: Webpack.Compiler) => {
    compiler.hooks.emit.tap("kiwi-json", compilation => {
      let json: any = {}

      Object.keys(compilation.assets).forEach(assetPath => {
        if(!/^.cache|(sw.[a-z0-9]+.js)|(.*.hot-update.js(on)?)$/.test(assetPath)) {
          const key = `/${assetPath === "index.html" ? "" : assetPath}`
          json[key] = etag(compilation.assets[assetPath].source())
        }
      })

      json = JSON.stringify(json)
      compilation.assets["static/kiwi.json"] = {
        source: () => json,
        size: () => json.length,
      }
    })
  },
})

const generateStatsCheck = (exitOnError = false) => {
  return (compiler: Compiler) => {
    compiler.hooks.done.tap("KiwiBundleStatsCheck", stats => {
      if(stats.compilation.errors && stats.compilation.errors.length) {
        console.error(stats.compilation.errors)
        if(exitOnError) process.exit(1)
      }
    })
  }
}

const plugins = (path: string, bundlePath: string, kiwiConfig: any) => new WebpackConfig({

  common: () => [
    new CheckerPlugin(),
    new StyleLintPlugin(),
    new HtmlWebpackPlugin({
      template: pathLib.join(bundlePath, "opt", "index.html.ejs"),
      lang: kiwiConfig.project.lang,
      title: kiwiConfig.project.title,
      description: kiwiConfig.project.description,
      generateKiwiConfig: (webpack: any) => {
        const config: any = {}
        if(Array.isArray(webpack.assetsByChunkName.sw)) {
          config.sw = webpack.assetsByChunkName.sw[0]
        } else {
          config.sw = webpack.assetsByChunkName.sw
        }
        return `<script>window.kiwi=${JSON.stringify(config)}</script>`
      },
      excludeChunks: [ "sw" ],
      minify: {
        preserveLineBreaks: true,
        collapseWhitespace: true,
      },
    }),
  ],

  development: () => [
    new Webpack.HotModuleReplacementPlugin(),
    generateIconsAndManifest(kiwiConfig, path, true),
    generateKiwiJson(),
  ],

  production: () => [
    generateIconsAndManifest(kiwiConfig, path, false),
    generateKiwiJson(),
    generateStatsCheck(true),
  ],

})

export default plugins
