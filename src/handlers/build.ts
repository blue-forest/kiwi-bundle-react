import { KiwiBundleHandler } from "../.bundles/kiwi-bundle/handler"
import { spawn } from "child_process"
import { join } from "path"

export const main: KiwiBundleHandler = ({ path }) => {
  spawn(
    join(path, "node_modules/.bin/react-scripts"),
    ["build"],
    {
      shell: true,
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
