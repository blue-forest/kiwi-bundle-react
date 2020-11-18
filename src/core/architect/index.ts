import { ReactNative } from "../../vendors"
import { AppConfig } from "../app/config"
import { AppLinksImports } from "../app/links"
import { ArchitectComponent, ArchitectComponentProps } from "./component"
import { ArchitectContext } from "./context"
import { ArchitectFunctions } from "./functions"
import { ArchitectOnInit } from "./onInit"
import { ArchitectOnMount } from "./onMount"
import { ArchitectOnUnmount } from "./onUnmount"
import { ArchitectOnUpdate } from "./onUpdate"
import { ArchitectOptions } from "./options"
import { ArchitectRender } from "./render"
import { ArchitectSelf } from "./self"
import { ArchitectStates } from "./states"
import { ArchitectStores } from "./stores"
import { ArchitectStyle } from "./style"
import { ArchitectValues } from "./values"

export const Architect = <
  Config extends AppConfig,
  Links extends AppLinksImports<Config>
>(
  options: Omit<ArchitectOptions<Config, Links, {}>, "context" | "cache">,
) => {
  return <Props extends ArchitectComponentProps>(
    architect: (
      self: ArchitectSelf<Config, Links, Props>,
    ) => ArchitectComponent<Props>,
  ) => {
    const context: ArchitectContext<Config, Links, Props> = {
      appearance: {
        colors: options.app.config.appearance.colors,
        theme: {
          ...options.app.options.actions.theme.name.data,
          colors: {} as any,
          scheme: options.app.options.actions.theme.scheme.data,
        },
      },
      OS: ReactNative.Platform.OS,
      navigation: {} as any,
      props: {} as any,
      style: {},
      states: { get: {}, set: {} },
      stores: {} as any,
      values: {},
      functions: {},
      update: () => { },
    }
    const children = { ...options, context, cache: {} }
    return architect({
      style: ArchitectStyle<Config, Links, Props>(children),
      states: ArchitectStates<Config, Links, Props, {}>(children),
      stores: ArchitectStores<Config, Links, Props, {}, {}>(children),
      values: ArchitectValues<Config, Links, Props, {}, {}, []>(children),
      functions: ArchitectFunctions<Config, Links, Props, {}, {}, [], {}>(
        children,
      ),
      onInit: ArchitectOnInit<Config, Links, Props, {}, {}, [], {}, {}>(
        children,
      ),
      onMount: ArchitectOnMount<Config, Links, Props, {}, {}, [], {}, {}>(
        children,
      ),
      onUpdate: ArchitectOnUpdate<Config, Links, Props, {}, {}, [], {}, {}>(
        children,
      ),
      onUnmount: ArchitectOnUnmount<Config, Links, Props, {}, {}, [], {}, {}>(
        children,
      ),
      render: ArchitectRender<Config, Links, Props, {}, {}, [], {}, {}>(
        children,
      ),
    })
  }
}
