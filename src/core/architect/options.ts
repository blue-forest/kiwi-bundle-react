import { AppConfig } from "../app/config"
import { AppLinksImports } from "../app/links"
import { AppOptions } from "../app/options"
import {
  ArchitectComponentProps,
  ArchitectComponentStyle,
  ArchitectComponentStates,
  ArchitectComponentType,
  ArchitectComponentFunctions,
  ArchitectComponentStores,
  ArchitectComponentValues,
} from "./component"
import { ArchitectContext } from "./context"

export type ArchitectOptions<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle = {},
  States extends ArchitectComponentStates = {},
  Values extends ArchitectComponentValues = {},
  Functions extends ArchitectComponentFunctions = {},
  Stores extends ArchitectComponentStores<Config, Links, Props, Style, States, Values, Functions, Stores> = any,
  > = {
    type: ArchitectComponentType
    app: {
      config: Config
      options: AppOptions<keyof Links["themes"]>
    }
    context: ArchitectContext<Config, Links, Props, Style, States, Values, Functions, Stores>
    cache: {
      states?: States
      onInit?: (context: ArchitectContext<Config, Links, Props, Style, States, Values, Functions, Stores>) => void
      onMount?: (context: ArchitectContext<Config, Links, Props, Style, States, Values, Functions, Stores>) => void
      onUnmount?: (context: ArchitectContext<Config, Links, Props, Style, States, Values, Functions, Stores>) => void
    }
  }
