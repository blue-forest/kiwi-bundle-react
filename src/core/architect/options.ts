import { AppConfig } from "../app/config"
import { AppLinksImports } from "../app/links"
import { AppOptions } from "../app/options"
import {
  ArchitectComponentProps,
  ArchitectComponentStyle,
  ArchitectComponentStates,
  ArchitectComponentType,
  ArchitectComponentFunctions,
  ArchitectComponentValues,
} from "./component"
import { ArchitectContext } from "./context"

export type ArchitectOptions<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle = any,
  States extends ArchitectComponentStates = any,
  Values extends ArchitectComponentValues = any,
  Functions extends ArchitectComponentFunctions = any,
  > = {
    type: ArchitectComponentType
    app: {
      config: Config
      options: AppOptions<keyof Links["themes"]>
    }
    context: ArchitectContext<Config, Links, Props, Style, States, Values, Functions>
    cache: {
      states?: States
      functions?: (context: ArchitectContext<Config, Links, Props, Style, States, Values, Functions>) => Functions
      onInit?: (context: ArchitectContext<Config, Links, Props, Style, States, Values, Functions>) => void
      onMount?: (context: ArchitectContext<Config, Links, Props, Style, States, Values, Functions>) => void
      onUnmount?: (context: ArchitectContext<Config, Links, Props, Style, States, Values, Functions>) => void
    }
  }
