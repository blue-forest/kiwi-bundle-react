import { ReactNative } from "../vendors"
import { NavigationProp, useNavigation, useTheme } from "@react-navigation/native"
import { AppComponent, AppComponentProps, AppComponentStates, AppConfig, AppGlobalState } from "./app"
import { AppLinksImports } from "./links"
import { ArchitectSelf as ArchitectOptions, ArchitectContext, ArchitectRender } from "./architect.types"
import { AppStyleSheet } from "./styles"

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
  const createRender = <Config extends AppConfig,
    Links extends AppLinksImports<Config>,
    Props extends AppComponentProps,
    Style extends AppStyleSheet = any,
    Stores = any,
    States extends AppComponentStates = any,
    Values = any,
    Functions = any,
    >(): ArchitectRender<Config, Links, Props, Style, Stores, States, Values, Functions> => render => {
      /*let style: Options["style"] = {}
      if (typeof options?.style !== "undefined") {
        style = options.style
      }*/
      return props => {
        // NAVIGATION
        const navigation: NavigationProp<any> = type === ArchitectType.PAGE ? props.navigation : useNavigation()
        // THEME
        const { colors } = useTheme()
        // CONTEXT
        const context: ArchitectContext<Config, Links, Props, Style, Stores, any, Values, Functions> = {
          appearance: {
            colors: config.appearance.colors,
            theme: {
              ...globalState.theme.name.target,
              colors,
              scheme: globalState.theme.scheme.target,
            },
          },
          props: type === ArchitectType.PAGE ? props.route.params : props,
          style: {} as any, // TODO
          stores: {} as any, // TODO
          state: { get: {}, set: {} },
          values: {} as any, // TODO
          functions: {} as any, // TODO
          OS: ReactNative.Platform.OS,
          navigation: {
            push: (route, params) => { navigation.navigate(route, params) },
          },
        }
        // STATES
        /*if (typeof states !== "undefined") {
          Object.keys(states).forEach(name => {
            const state = React.useState(states[name])
            context.state.get[name] = state[0]
            context.state.set[name] = state[1]
          })
        }*/
        // INIT
        /*if (typeof start.init !== "undefined") {
          const init = start.init
          React.useEffect(() => {
            init(context)
          }, [])
        }*/
        return render(context)
      }
    }
  return <Props extends AppComponentProps>(architect: (options: ArchitectOptions<Config, Links, Props>) => AppComponent<Props>) => {
    return architect({
      render: createRender<Config, Links, Props>(),
    })
  }
}
