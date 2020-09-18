import { KiwiBundleStartHandler } from "../.bundles/kiwi-bundle/handlers"
// import spawn from "react-dev-utils/crossSpawn"

export const main: KiwiBundleStartHandler = ({ path }) => {

  console.log(path)
  /*spawn.sync(
    process.execPath,
    nodeArgs
      .concat(require.resolve('../scripts/' + script))
      .concat(args.slice(scriptIndex + 1)),
    { stdio: 'inherit' }
  )*/
  /*const webpackConfig = generateWebpackConfig(path, outDir, options, handlers, Environment.DEVELOPMENT)
  const server = new WebpackDevServer(Webpack(webpackConfig) as any, webpackConfig.devServer)
  webpackConsoleLog("Webpack launched for a watched development build...")
  server.listen(webpackConfig.devServer.port, webpackConfig.devServer.host, () => {
    webpackConsoleLog(
      `Development server will ba available at ` +
      chalk.bold(`http://${webpackConfig.devServer.host}:${webpackConfig.devServer.port}`)
    )
  })*/
}
