import { ReactNative } from "../../vendors"
import { AppComponent, AppComponentProps, AppConfig } from "../app"
import { AppLinksImports } from "../links"
import { ArchitectContext } from "./context"
import { ArchitectOnInit } from "./onInit"
import { ArchitectOnMount } from "./onMount"
import { ArchitectOnUnmount } from "./onUnmount"
import { ArchitectOptions } from "./options"
import { ArchitectRender } from "./render"
import { ArchitectSelf } from "./self"
import { ArchitectStates } from "./states"
import { ArchitectStyle } from "./style"

export enum ArchitectType {
  COMPONENT,
  LAYOUT,
  PAGE,
}

export const Architect = <
  Config extends AppConfig,
  Links extends AppLinksImports<Config>
>(options: Omit<ArchitectOptions<Config, Links>, "context" | "cache">) => {
  return <Props extends AppComponentProps>(architect: (self: ArchitectSelf<Config, Links, Props>) => AppComponent<Props>) => {
    const context: ArchitectContext<Config, Links, Props> = {
      appearance: {
        colors: options.app.config.appearance.colors,
        theme: {
          ...options.app.options.actions.theme.name.target,
          colors: {} as any,
          scheme: options.app.options.actions.theme.scheme.target,
        },
      },
      props: {} as any,
      style: {},
      stores: {},
      state: { get: {}, set: {} },
      values: {},
      functions: {},
      OS: ReactNative.Platform.OS,
      navigation: {} as any,
    }
    return architect({
      style: ArchitectStyle<Config, Links, Props>({ ...options, context, cache: {} }),
      states: ArchitectStates<Config, Links, Props>({ ...options, context, cache: {} }),
      onInit: ArchitectOnInit<Config, Links, Props>({ ...options, context, cache: {} }),
      onMount: ArchitectOnMount<Config, Links, Props>({ ...options, context, cache: {} }),
      onUnmount: ArchitectOnUnmount<Config, Links, Props>({ ...options, context, cache: {} }),
      render: ArchitectRender<Config, Links, Props>({ ...options, context, cache: {} }),
    })
  }
}
