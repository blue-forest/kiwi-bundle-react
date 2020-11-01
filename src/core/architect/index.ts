import { ReactNative } from "../../vendors"
import { AppComponent, AppComponentProps, AppConfig } from "../app"
import { AppLinksImports } from "../links"
import { ArchitectContext } from "./context"
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

export const Architect = <Config extends AppConfig, Links extends AppLinksImports<Config>>(options: Omit<ArchitectOptions<Config, Links>, "context">) => {
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
      style: ArchitectStyle<Config, Links, Props>({ ...options, context }),
      states: ArchitectStates<Config, Links, Props>({ ...options, context }),
      render: ArchitectRender<Config, Links, Props>({ ...options, context }),
    })
  }
}
