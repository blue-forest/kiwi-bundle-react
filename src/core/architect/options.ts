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
  ArchitectComponentStores,
} from "./component"
import { ArchitectContext } from "./context"

export type ArchitectOptions<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle = any,
  States extends ArchitectComponentStates = any,
  Stores extends ArchitectComponentStores = any,
  Values extends ArchitectComponentValues = any,
  Functions extends ArchitectComponentFunctions = any
  > = {
    type: ArchitectComponentType
    app: {
      config: Config
      options: AppOptions<keyof Links["themes"]>
    }
    context: ArchitectContext<
      Config,
      Links,
      Props,
      Style,
      States,
      Stores,
      Values,
      Functions
    >
    cache: {
      states?: States
      values?: Values
      functions?: (
        context: ArchitectContext<
          Config,
          Links,
          Props,
          Style,
          States,
          Stores,
          Values,
          Functions
        >,
      ) => Functions
      onInit?: (
        context: ArchitectContext<
          Config,
          Links,
          Props,
          Style,
          States,
          Stores,
          Values,
          Functions
        >,
      ) => void
      onMount?: (
        context: ArchitectContext<
          Config,
          Links,
          Props,
          Style,
          States,
          Stores,
          Values,
          Functions
        >,
      ) => void
      onUpdate?: (
        context: ArchitectContext<
          Config,
          Links,
          Props,
          Style,
          States,
          Stores,
          Values,
          Functions
        >,
      ) => void
      onUnmount?: (
        context: ArchitectContext<
          Config,
          Links,
          Props,
          Style,
          States,
          Stores,
          Values,
          Functions
        >,
      ) => void
    }
  }
