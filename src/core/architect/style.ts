import { AppLinksImports } from "../app/links"
import { ArchitectRender } from "./render"
import { ArchitectSelf } from "./self"
import { ArchitectStates } from "./states"
import { ArchitectOptions } from "./options"
import { ArchitectOnInit } from "./onInit"
import { ArchitectOnMount } from "./onMount"
import { ArchitectOnUnmount } from "./onUnmount"
import { ArchitectValues } from "./values"
import { ArchitectFunctions } from "./functions"
import {
  ArchitectComponentProps,
  ArchitectComponentStyle,
} from "./component"
import { AppConfig } from "../app/config"

export type ArchitectStyle<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  > = <Style extends ArchitectComponentStyle>(style: Style) => Omit<
    ArchitectSelf<Config, Links, Props, Style>,
    "style"
  >

export const ArchitectStyle = <
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  >(
    options: ArchitectOptions<Config, Links, Props>
  ): ArchitectStyle<Config, Links, Props> => {
  return style => {
    options.context.style = style
    return {
      states: ArchitectStates(options),
      values: ArchitectValues(options),
      functions: ArchitectFunctions(options),
      onInit: ArchitectOnInit(options),
      onMount: ArchitectOnMount(options),
      onUnmount: ArchitectOnUnmount(options),
      render: ArchitectRender(options),
    }
  }
}
