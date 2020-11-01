import { AppComponent, AppComponentProps, AppConfig, AppGlobalState } from "./app"
import { AppLinksImports } from "./links"
import * as ARCHITECT from "../architect"

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
  return <Props extends AppComponentProps>(architect: (options: ARCHITECT.Self<Config, Links, Props>) => AppComponent<Props>) => {
    return architect({
      style: ARCHITECT.createStyle<Config, Links, Props>(config, globalState, type),
      render: ARCHITECT.createRender<Config, Links, Props>(config, globalState, type),
    })
  }
}
