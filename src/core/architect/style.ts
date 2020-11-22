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
import { ArchitectComponentProps } from "./component"
import { AppConfig } from "../app/config"
import { ArchitectOnUpdate } from "./onUpdate"
import { ArchitectStores } from "./stores"
import { AppStyleSheet, renderStyle } from "../app/styles"

export type ArchitectStyle<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps
  > = <Style extends AppStyleSheet>(
    style: Style,
  ) => Omit<ArchitectSelf<Config, Links, Props, Style>, "style">

export const ArchitectStyle = <
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps
>(
  options: ArchitectOptions<Config, Links, Props>,
): ArchitectStyle<Config, Links, Props> => {
  return <Style extends AppStyleSheet>(style: Style) => {
    renderStyle(
      style,
      (currentStyle) => {
        options.context.style = currentStyle
      },
      options.context.update,
    )
    return {
      states: ArchitectStates<Config, Links, Props, Style>(options),
      stores: ArchitectStores<Config, Links, Props, Style, {}>(options),
      values: ArchitectValues<Config, Links, Props, Style, {}>(options),
      functions: ArchitectFunctions<Config, Links, Props, Style, {}, {}>(
        options,
      ),
      onInit: ArchitectOnInit<Config, Links, Props, Style, {}, {}, {}>(options),
      onMount: ArchitectOnMount<Config, Links, Props, Style, {}, {}, {}>(
        options,
      ),
      onUpdate: ArchitectOnUpdate<Config, Links, Props, Style, {}, {}, {}>(
        options,
      ),
      onUnmount: ArchitectOnUnmount<Config, Links, Props, Style, {}, {}, {}>(
        options,
      ),
      render: ArchitectRender<Config, Links, Props, Style, {}, {}, {}>(options),
    }
  }
}
