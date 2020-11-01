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
  Props extends ArchitectComponentProps = {},
  Style extends ArchitectComponentStyle = {},
  Stores extends ArchitectComponentStores = {},
  States extends ArchitectComponentStates = {},
  Values extends ArchitectComponentValues = {},
  Functions extends ArchitectComponentFunctions = {},
  > = {
    type: ArchitectComponentType
    app: {
      config: Config
      options: AppOptions<keyof Links["themes"]>
    }
    context: ArchitectContext<Config, Links, Props, Style, Stores, States, Values, Functions>
    cache: {
      states?: States
      onInit?: (
        context: ArchitectContext<Config, Links, Props, Style, Stores, States, Values, Functions>
      ) => void
      onMount?: (
        context: ArchitectContext<Config, Links, Props, Style, Stores, States, Values, Functions>
      ) => void
      onUnmount?: (
        context: ArchitectContext<Config, Links, Props, Style, Stores, States, Values, Functions>
      ) => void
    }
  }
