import { KiwiBundleHandler } from "../.bundles/kiwi-bundle/handler"
import { spawn } from "child_process"

export const main: KiwiBundleHandler = ({ path }) => {
  spawn(
    "./node_modules/.bin/react-scripts",
    [ "build" ],
    {
      // shell: true,
      stdio: "inherit",
      uid: 1000,
      cwd: path,
      env: {
        SKIP_PREFLIGHT_CHECK: "true",
        FORCE_COLOR: "true",
      },
    }
  )
}
