import { AppConfig } from "../app/config"
import { AppLinksImports } from "../app/links"
import {
  ArchitectComponentFunctions,
  ArchitectComponentProps,
  ArchitectComponentStates,
  ArchitectComponentStores,
  ArchitectComponentStyle,
  ArchitectComponentValues,
} from "./component"
import { ArchitectOnInit } from "./onInit"
import { ArchitectOnMount } from "./onMount"
import { ArchitectOnUnmount } from "./onUnmount"
import { ArchitectOptions } from "./options"
import { ArchitectRender } from "./render"

export const ArchitectStores = <
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle = {},
  States extends ArchitectComponentStates = {},
  Values extends ArchitectComponentValues = {},
  Functions extends ArchitectComponentFunctions = {},
  EmptyStores extends ArchitectComponentStores<Config, Links, Props, Style, States, Values, Functions, EmptyStores> = any,
  >(
    options: ArchitectOptions<Config, Links, Props, Style, States, Values, Functions, any>,
) => {
  return <Stores extends ArchitectComponentStores<Config, Links, Props, Style, States, Values, Functions, Stores>>(
    stores: Stores,
  ) => {
    console.log(stores)
    return {
      onInit: ArchitectOnInit<Config, Links, Props, Style, States, Values, Functions, Stores>(options),
      onMount: ArchitectOnMount<Config, Links, Props, Style, States, Values, Functions, Stores>(options),
      onUnmount: ArchitectOnUnmount<Config, Links, Props, Style, States, Values, Functions, Stores>(options),
      render: ArchitectRender<Config, Links, Props, Style, States, Values, Functions, Stores>(options),
    }
  }
}
