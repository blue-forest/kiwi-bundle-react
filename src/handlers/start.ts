import { KiwiBundleHandler } from "../.bundles/kiwi-bundle/handler"
import { spawn } from "child_process"

export const main: KiwiBundleHandler = ({ path }) => {
  spawn(
    "./node_modules/.bin/react-scripts",
    [ "start" ],
    {
      // stdio: [ process.stdin, process.stdout, process.stderr ],
      shell: true,
      stdio: "inherit",
      cwd: path,
      env: {
        SKIP_PREFLIGHT_CHECK: "true",
        FORCE_COLOR: "true",
      },
    }
  )
}
