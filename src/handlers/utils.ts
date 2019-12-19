import chalk from "chalk"

export const webpackConsoleLog = (text: string) => {
  console.log(`${chalk.blue("ℹ")} ${chalk.gray("｢kwb｣")}: ${text}`)
}
