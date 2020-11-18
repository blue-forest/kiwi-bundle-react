import { AppConfig } from "../app/config"
import { AppLinksImports } from "../app/links"
import {
  ArchitectComponentProps,
  ArchitectComponentStates,
  ArchitectComponentStores,
  ArchitectComponentStyle,
  ArchitectComponentValues,
} from "./component"
import { ArchitectFunctions } from "./functions"
import { ArchitectOnInit } from "./onInit"
import { ArchitectOnMount } from "./onMount"
import { ArchitectOnUnmount } from "./onUnmount"
import { ArchitectOnUpdate } from "./onUpdate"
import { ArchitectOptions } from "./options"
import { ArchitectRender } from "./render"
import { ArchitectSelf } from "./self"

export type ArchitectValues<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle,
  States extends ArchitectComponentStates,
  Stores extends ArchitectComponentStores
  > = <Values extends ArchitectComponentValues>(
    values: Values,
  ) => Omit<
    ArchitectSelf<Config, Links, Props, Style, States, Stores, Values>,
    "style" | "states" | "values"
  >

export const ArchitectValues = <
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle,
  States extends ArchitectComponentStates,
  Stores extends ArchitectComponentStores
>(
  options: ArchitectOptions<Config, Links, Props, Style, States, Stores>,
): ArchitectValues<Config, Links, Props, Style, States, Stores> => {
  return <Values extends ArchitectComponentValues>(values: Values) => {
    options.cache.values = values
    return {
      functions: ArchitectFunctions<
        Config,
        Links,
        Props,
        Style,
        States,
        Stores,
        Values
      >(options),
      onInit: ArchitectOnInit<
        Config,
        Links,
        Props,
        Style,
        States,
        Stores,
        Values,
        {}
      >(options),
      onMount: ArchitectOnMount<
        Config,
        Links,
        Props,
        Style,
        States,
        Stores,
        Values,
        {}
      >(options),
      onUpdate: ArchitectOnUpdate<
        Config,
        Links,
        Props,
        Style,
        States,
        Stores,
        Values,
        {}
      >(options),
      onUnmount: ArchitectOnUnmount<
        Config,
        Links,
        Props,
        Style,
        States,
        Stores,
        Values,
        {}
      >(options),
      render: ArchitectRender<
        Config,
        Links,
        Props,
        Style,
        States,
        Stores,
        Values,
        {}
      >(options),
    }
  }
}
