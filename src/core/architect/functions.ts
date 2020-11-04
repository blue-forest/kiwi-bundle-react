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
  EmptyFunctions extends ArchitectComponentFunctions<Config, Links, Props, Style, States, Values, EmptyFunctions>,
  > = <Functions extends EmptyFunctions>(functions: Functions)
    => Omit<ArchitectSelf<Config, Links, Props, Style, States, Values, Functions>,
      "style" | "states" | "values" | "functions"
    >

export const ArchitectFunctions = <
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle = any,
  States extends ArchitectComponentStates = any,
  Values extends ArchitectComponentValues = any,
  EmptyFunctions extends ArchitectComponentFunctions<Config, Links, Props, Style, States, Values, EmptyFunctions> = any,
  >(
    options: ArchitectOptions<Config, Links, Props, Style, States, Values, any>
  ): ArchitectFunctions<Config, Links, Props, Style, States, Values, EmptyFunctions> => {
  return functions => {
    console.log(functions)
    return {
      onInit: ArchitectOnInit(options),
      onMount: ArchitectOnMount(options),
      onUnmount: ArchitectOnUnmount(options),
      render: ArchitectRender(options),
    }
  }
}
