import { AppComponent, AppComponentProps, AppConfig, AppGlobalState } from "../app"
import { AppLinksImports } from "../links"
import { createRender } from "./render"
import { ArchitectSelf } from "./self"
import { createStyle } from "./style"

export enum ArchitectType {
  COMPONENT,
  LAYOUT,
  PAGE,
}

export const Architect = <Config extends AppConfig, Links extends AppLinksImports<Config>>(
  config: Config,
  globalState: AppGlobalState<keyof Links["themes"]>,
  type: ArchitectType,
) => {
  return <Props extends AppComponentProps>(architect: (options: ArchitectSelf<Config, Links, Props>) => AppComponent<Props>) => {
    return architect({
      style: createStyle<Config, Links, Props>(config, globalState, type),
      render: createRender<Config, Links, Props>(config, globalState, type),
    })
  }
}
