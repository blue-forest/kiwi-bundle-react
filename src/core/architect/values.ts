import { AppConfig } from "../app/config"
import { AppLinksImports } from "../app/links"
import {
  ArchitectComponentFunctions,
  ArchitectComponentProps,
  ArchitectComponentStates,
  ArchitectComponentStyle,
  ArchitectComponentValues,
} from "./component"
import { ArchitectFunctions } from "./functions"
import { ArchitectOnInit } from "./onInit"
import { ArchitectOnMount } from "./onMount"
import { ArchitectOnUnmount } from "./onUnmount"
import { ArchitectOptions } from "./options"
import { ArchitectRender } from "./render"
import { ArchitectSelf } from "./self"

export type ArchitectValues<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle,
  States extends ArchitectComponentStates,
  EmptyValues extends ArchitectComponentValues,
  Functions extends ArchitectComponentFunctions<Config, Links, Props, Style, States, EmptyValues, Functions>,
  > = <Values extends EmptyValues>(values: Values)
    => Omit<
      ArchitectSelf<Config, Links, Props, Style, States, Values, Functions>,
      "style" | "states" | "values"
    >

export const ArchitectValues = <
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle = any,
  States extends ArchitectComponentStates = any,
  Values extends ArchitectComponentValues = any,
  Functions extends ArchitectComponentFunctions<Config, Links, Props, Style, States, Values, Functions> = any,
  >(
    options: ArchitectOptions<Config, Links, Props, Style, States, any, Functions>
  ): ArchitectValues<Config, Links, Props, Style, States, Values, Functions> => {
  return values => {
    console.log(values)
    return {
      functions: ArchitectFunctions(options),
      onInit: ArchitectOnInit(options),
      onMount: ArchitectOnMount(options),
      onUnmount: ArchitectOnUnmount(options),
      render: ArchitectRender(options),
    }
  }
}
