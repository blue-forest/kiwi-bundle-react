import { ReactNative } from "../../vendors"
import { AppConfig } from "../app/config"
import { AppLinksImports } from "../app/links"
import { ArchitectComponent, ArchitectComponentProps } from "./component"
import { ArchitectContext } from "./context"
import { ArchitectFunctions } from "./functions"
import { ArchitectOnInit } from "./onInit"
import { ArchitectOnMount } from "./onMount"
import { ArchitectOnUnmount } from "./onUnmount"
import { ArchitectOptions } from "./options"
import { ArchitectRender } from "./render"
import { ArchitectStates } from "./states"
import { ArchitectStores } from "./stores"
import { ArchitectStyle } from "./style"
import { ArchitectValues } from "./values"

export const Architect = <
  Config extends AppConfig,
  Links extends AppLinksImports<Config>
>(options: Omit<ArchitectOptions<Config, Links, {}>, "context" | "cache">) => {
  return <Props extends ArchitectComponentProps>(
    architect: (self: {
      style: typeof ArchitectStyle
      states: typeof ArchitectStates
      values: typeof ArchitectValues
      functions: typeof ArchitectFunctions
      stores: typeof ArchitectStores
      onInit: typeof ArchitectOnInit
      onMount: typeof ArchitectOnMount
      onUnmount: typeof ArchitectOnUnmount
      render: typeof ArchitectRender
    }) => ArchitectComponent<Props>,
  ) => {
    const context: ArchitectContext<Config, Links, Props> = {
      appearance: {
        colors: options.app.config.appearance.colors,
        theme: {
          ...options.app.options.actions.theme.name.target,
          colors: {} as any,
          scheme: options.app.options.actions.theme.scheme.target,
        },
      },
      OS: ReactNative.Platform.OS,
      navigation: {} as any,
      props: {} as any,
      style: {},
      state: { get: {}, set: {} },
      values: {},
      functions: {},
      stores: {},
    }
    const children = { ...options, context, cache: {} }
    return architect({
      style: ArchitectStyle<Config, Links, Props>(children),
      states: ArchitectStates<Config, Links, Props>(children),
      values: ArchitectValues<Config, Links, Props>(children),
      functions: ArchitectFunctions<Config, Links, Props>(children),
      stores: ArchitectStores<Config, Links, Props>(children),
      onInit: ArchitectOnInit<Config, Links, Props>(children),
      onMount: ArchitectOnMount<Config, Links, Props>(children),
      onUnmount: ArchitectOnUnmount<Config, Links, Props>(children),
      render: ArchitectRender<Config, Links, Props>(children),
    })
  }
}
