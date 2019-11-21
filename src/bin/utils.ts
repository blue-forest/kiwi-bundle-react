import chalk from "chalk"
import fs from "fs"
import pathLib from "path"

export const webpackConsoleLog = (text: string) => {
  console.log(`${chalk.blue("ℹ")} ${chalk.gray("｢kwb｣")}: ${text}`)
}

const parsePackageDependencies = (fileData: any, callback: any) => {
  const json = JSON.parse(fileData)
  if(typeof json.dependencies !== "undefined") {
    Object.keys(json.dependencies).forEach(callback)
  }
  if(typeof json.devDependencies !== "undefined") {
    Object.keys(json.devDependencies).forEach(callback)
  }
}

const createSymbolicLink = (srcPath: string, distPath: string) => {
  fs.exists(distPath, exists => {
    if(!exists) {
      fs.symlinkSync(srcPath, distPath)
    }
  })
}

export const createModuleSymbolicLinks = (rootPath: string) => {
  return new Promise(resolve => {
    const baseModules = pathLib.join(rootPath, "node_modules")
    const bundlePath = pathLib.join(baseModules, "kiwi-bundle")
    const bundleModules = pathLib.join(bundlePath, "node_modules")
    fs.exists(bundleModules, exists => {
      if(!exists) fs.mkdirSync(bundleModules)
      fs.readFile(pathLib.join(bundlePath, "package.json"), "utf8", (error, fileData) => {
        if(error === null) {
          parsePackageDependencies(fileData, (dependency: string) => {
            createSymbolicLink(pathLib.join(baseModules, dependency), pathLib.join(bundleModules, dependency))
          })
        }
      })
      resolve()
    })
  })
}
