#!/usr/bin/env node
import chalk from "chalk"
import startCommand from "./start"
import buildCommand from "./build"

const error = (message: string) => {
  console.error(chalk.red(`[ERROR] ${message}`))
  process.exit(1)
}

if(process.argv.length === 2) {
  error("No command argument")
}

if(process.argv.length !== 3) {
  error(`Too much arguments (${process.argv.length - 2} instead of 1)`)
}

const path = process.cwd()

switch(process.argv[2]) {

  case "start":
    startCommand(path)
    break

  case "build":
    buildCommand(path)
    break

  default:
    error(`The command "${process.argv[2]}" does not exist`)

}
