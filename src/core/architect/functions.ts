import { AppConfig } from "../app/config"
import { AppLinksImports } from "../app/links"
import { ArchitectComponentFunctions, ArchitectComponentProps, ArchitectComponentStates, ArchitectComponentStyle, ArchitectComponentValues } from "./component"
import { ArchitectOnInit } from "./onInit"
import { ArchitectOnMount } from "./onMount"
import { ArchitectOnUnmount } from "./onUnmount"
import { ArchitectOptions } from "./options"
import { ArchitectRender } from "./render"
import { ArchitectSelf } from "./self"

export type ArchitectFunctions<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle,
  States extends ArchitectComponentStates,
  Values extends ArchitectComponentValues,
  > = <Functions extends ArchitectComponentFunctions<Config, Links, Props, Style, States, Values, Functions>>(
    functions: Functions
  ) => Omit<
    ArchitectSelf<Config, Links, Props, Style, States, Values, Functions>,
    "style" | "states" | "values" | "functions"
  >

export const ArchitectFunctions = <
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle,
  States extends ArchitectComponentStates,
  Values extends ArchitectComponentValues,
  >(
    options: ArchitectOptions<Config, Links, Props, Style, States, Values>
  ): ArchitectFunctions<Config, Links, Props, Style, States, Values> => {
  return <Functions extends ArchitectComponentFunctions<Config, Links, Props, Style, States, Values, Functions>>(
    functions: Functions
  ) => {
    console.log(functions)
    return {
      onInit: ArchitectOnInit<Config, Links, Props, Style, States, Values, Functions>(options),
      onMount: ArchitectOnMount<Config, Links, Props, Style, States, Values, Functions>(options),
      onUnmount: ArchitectOnUnmount<Config, Links, Props, Style, States, Values, Functions>(options),
      render: ArchitectRender<Config, Links, Props, Style, States, Values, Functions>(options),
    }
  }
}
