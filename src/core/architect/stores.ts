import { AppConfig } from "../app/config"
import { AppLinksImports } from "../app/links"
import { AppStoreBinding } from "../app/store"
import {
  ArchitectComponentProps,
  ArchitectComponentStates,
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
  > = <Stores extends AppStoreBinding[]>(
    stores: Stores,
  ) => Omit<
    ArchitectSelf<Config, Links, Props, Style, States>,
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
  return <Stores extends AppStoreBinding[]>(stores: Stores) => {
    stores.forEach((onUpdate) => onUpdate(() => options.context.update()))
    return {
      values: ArchitectValues<Config, Links, Props, Style, States>(options),
      functions: ArchitectFunctions<Config, Links, Props, Style, States, {}>(
        options,
      ),
      onInit: ArchitectOnInit<Config, Links, Props, Style, States, {}, {}>(
        options,
      ),
      onMount: ArchitectOnMount<Config, Links, Props, Style, States, {}, {}>(
        options,
      ),
      onUpdate: ArchitectOnUpdate<Config, Links, Props, Style, States, {}, {}>(
        options,
      ),
      onUnmount: ArchitectOnUnmount<
        Config,
        Links,
        Props,
        Style,
        States,
        {},
        {}
      >(options),
      render: ArchitectRender<Config, Links, Props, Style, States, {}, {}>(
        options,
      ),
    }
  }
}
