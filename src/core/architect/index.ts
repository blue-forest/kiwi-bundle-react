import { ReactNative } from "../../vendors"
import { AppComponent, AppComponentProps, AppConfig, AppGlobalState } from "../app"
import { AppLinksImports } from "../links"
import { ArchitectContext } from "./context"
import { ArchitectRender } from "./render"
import { ArchitectSelf } from "./self"
import { ArchitectStyle } from "./style"

export enum ArchitectType {
  COMPONENT,
  LAYOUT,
  PAGE,
}

export const Architect = <Config extends AppConfig, Links extends AppLinksImports<Config>>(
  type: ArchitectType,
  config: Config,
  global: AppGlobalState<keyof Links["themes"]>,
) => {
  return <Props extends AppComponentProps>(architect: (options: ArchitectSelf<Config, Links, Props>) => AppComponent<Props>) => {
    const context: ArchitectContext<Config, Links, Props> = {
      appearance: {
        colors: config.appearance.colors,
        theme: {
          ...global.theme.name.target,
          colors: {} as any,
          scheme: global.theme.scheme.target,
        },
      },
      props: {} as Props,
      style: {},
      stores: {},
      state: { get: {}, set: {} },
      values: {},
      functions: {},
      OS: ReactNative.Platform.OS,
      navigation: {} as any,
    }
    return architect({
      style: ArchitectStyle<Config, Links, Props>(config, global, type),
      states: ArchitectStyle<Config, Links, Props>(config, global, type),
      render: ArchitectRender<Config, Links, Props>(type, context),
    })
  }
}
