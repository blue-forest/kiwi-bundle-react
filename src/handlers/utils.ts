import { spawn } from "child_process"
import { join } from "path"

export const run = (path: string, bin: string, args: string[]) => {
  return spawn(
    join("node_modules", ".bin", bin),
    args,
    {
      // stdio: [ process.stdin, process.stdout, process.stderr ],
      shell: true,
      stdio: "inherit",
      cwd: path,
      env: {
        ...process.env,
        SKIP_PREFLIGHT_CHECK: "true",
        FORCE_COLOR: "true",
      },
    }
  )
}
