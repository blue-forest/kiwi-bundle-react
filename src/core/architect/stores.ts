import { AppConfig } from "../app/config"
import { AppLinksImports } from "../app/links"
import {
  ArchitectComponentProps,
  ArchitectComponentStates,
  ArchitectComponentStores,
  ArchitectComponentStyle,
} from "./component"
import { ArchitectFunctions } from "./functions"
import { ArchitectOnInit } from "./onInit"
import { ArchitectOnMount } from "./onMount"
import { ArchitectOnUnmount } from "./onUnmount"
import { ArchitectOnUpdate } from "./onUpdate"
import { ArchitectOptions } from "./options"
import { ArchitectRender } from "./render"
import { ArchitectSelf } from "./self"
import { ArchitectValues } from "./values"

export type ArchitectStores<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle,
  States extends ArchitectComponentStates
  > = <Stores extends ArchitectComponentStores>(
    stores: Stores,
  ) => Omit<
    ArchitectSelf<Config, Links, Props, Style, States, Stores>,
    "style" | "states" | "stores"
  >

export const ArchitectStores = <
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle,
  States extends ArchitectComponentStates
>(
  options: ArchitectOptions<Config, Links, Props, Style, States>,
): ArchitectStores<Config, Links, Props, Style, States> => {
  return <Stores extends ArchitectComponentStores>(stores: Stores) => {
    // options.context.stores = stores
    console.log(stores)
    return {
      values: ArchitectValues<Config, Links, Props, Style, States, Stores>(
        options,
      ),
      functions: ArchitectFunctions<
        Config,
        Links,
        Props,
        Style,
        States,
        Stores,
        {}
      >(options),
      onInit: ArchitectOnInit<
        Config,
        Links,
        Props,
        Style,
        States,
        Stores,
        {},
        {}
      >(options),
      onMount: ArchitectOnMount<
        Config,
        Links,
        Props,
        Style,
        States,
        Stores,
        {},
        {}
      >(options),
      onUpdate: ArchitectOnUpdate<
        Config,
        Links,
        Props,
        Style,
        States,
        Stores,
        {},
        {}
      >(options),
      onUnmount: ArchitectOnUnmount<
        Config,
        Links,
        Props,
        Style,
        States,
        Stores,
        {},
        {}
      >(options),
      render: ArchitectRender<
        Config,
        Links,
        Props,
        Style,
        States,
        Stores,
        {},
        {}
      >(options),
    }
  }
}
