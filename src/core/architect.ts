import { React, ReactNative } from "../vendors"
import { NavigationProp, useNavigation, useTheme } from "@react-navigation/native"
import { AppComponent, AppComponentProps, AppComponentStates, AppConfig, AppStateGlobalActions } from "./app"
import { AppStyleSheet } from "./styles"
import { AppLinksImports, AppTheme } from "./links"

export enum ArchitectType {
  COMPONENT,
  LAYOUT,
  PAGE,
}

type ArchitectOptions = {
  style?: AppStyleSheet
}

type ArchitectContext<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Options extends ArchitectOptions,
  States extends AppComponentStates,
  Props extends AppComponentProps,
  //Operations extends ArchitectOperations<Config, Links, Options, States, Props, Operations>,
  > = {
    props: Props
    style: Options["style"]
    /*values: Operations["values"]
    functions: Operations["functions"]*/
    OS: ReactNative.PlatformOSType
    state: {
      get: { [name in keyof States]: States[keyof States] }
      set: { [name in keyof States]: (v: States[keyof States]) => void }
    }
    navigation: {
      push: (route: keyof Config["navigation"]["routes"], params?: { [key: string]: string }) => void
    }
    appearance: {
      colors: Config["appearance"]["colors"]
      theme: {
        get: () => AppTheme<Config> | undefined
        set: (theme: keyof Links["themes"]) => void
      }
      scheme: {
        get: () => "dark" | "light" | undefined
        set: (scheme: "dark" | "light") => void
      }
    }
  }

/*type ArchitectOperations<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Options extends ArchitectOptions,
  States extends AppComponentStates,
  Props extends AppComponentProps,
  Operations extends ArchitectOperations<Config, Links, Options, States, Props, Operations>,
  > = {
    values?: { [name: string]: any }
    functions?: {
      [name: string]: (context: ArchitectContext<Config, Links, Options, States, Props, Operations>) => void,
    }
  }*/

type AppComponentStart<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Options extends ArchitectOptions,
  States extends AppComponentStates,
  Props extends AppComponentProps,
  //Operations extends ArchitectOperations<Config, Links, Options, States, Props, Operations>,
  > = {
    init?: (context: ArchitectContext<Config, Links, Options, States, Props>) => void
    render: (context: ArchitectContext<Config, Links, Options, States, Props>) => JSX.Element
  }

export const Architect = <Config extends AppConfig, Links extends AppLinksImports<Config>>(
  type: ArchitectType,
  globalStateActions: AppStateGlobalActions,
) => {
  return <Options extends ArchitectOptions>(options?: Options) => {
    let style: Options["style"] = {}
    if (typeof options?.style !== "undefined") {
      style = options.style
    }
    return <States extends AppComponentStates>(states?: States) => {
      //return <Values extends { [name: string]: any }>(values?: Values) => {
      return <Props extends AppComponentProps>(start: AppComponentStart<Config, Links, Options, States, Props>): AppComponent<Props> => {
        return props => {
          // NAVIGATION
          const navigation: NavigationProp<any> = type === ArchitectType.PAGE ? props.navigation : useNavigation()
          // THEME
          const { colors } = useTheme()
          // CONTEXT
          const context: ArchitectContext<Config, Links, Options, any, Props> = {
            props: type === ArchitectType.PAGE ? props.route.params : props,
            style,
            OS: ReactNative.Platform.OS,
            state: { get: {}, set: {} },
            navigation: {
              push: (route, params) => { navigation.navigate(route, params) },
            },
            appearance: {
              colors,
              theme: {
                get: globalStateActions.getTheme,
                set: globalStateActions.setTheme,
              },
              scheme: {
                get: globalStateActions.getScheme,
                set: globalStateActions.setScheme,
              },
            }
          }
          // STATES
          if (typeof states !== "undefined") {
            Object.keys(states).forEach(name => {
              const state = React.useState(states[name])
              context.state.get[name] = state[0]
              context.state.set[name] = state[1]
            })
          }
          // INIT
          if (typeof start.init !== "undefined") {
            const init = start.init
            React.useEffect(() => {
              init(context)
            }, [])
          }
          return start.render(context)
        }
      }
    }
    //}
  }
}
