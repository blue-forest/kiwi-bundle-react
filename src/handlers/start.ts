import { KiwiBundleHandler } from "../.bundles/kiwi-bundle/handler"
import { run } from "./utils"

const help = () => {
  console.log("You have to choose which platform to start :")
  console.log("- web : local development in browser")
  console.log("- metro : link between this host and mobile applications")
  console.log("- android : development on Android device")
  console.log("- ios : development on iOS device")
}

export const main: KiwiBundleHandler = ({ path, args }) => {
  if(args.length !== 1) {
    if(args.length !== 0) {
      console.log("/!\\ You provided too many arguments\n")
    }
    help()
  } else {
    switch(args[0]) {
      case "web": run(path, "react-scripts", [ "start" ]); break
      case "metro": run(path, "react-native", [ "start" ]); break
      case "android": run(path, "react-native", [ "run-android" ]); break
      case "ios": run(path, "react-native", [ "run-ios" ]); break
      default:
        console.log(`/!\\ Unknown argument "${args[0]}"\n`)
        help()
        break
    }
  }
}
