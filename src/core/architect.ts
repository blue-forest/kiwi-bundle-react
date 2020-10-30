import { React } from "../vendors"
import { NavigationProp, useNavigation, useTheme } from "@react-navigation/native"
import { AppComponent, AppComponentProps, AppComponentStates, AppConfig } from "./app"
import { AppStyleSheet } from "./styles"
import { AppLinksImports } from "./links"

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
  > = {
    props: Props
    style: Options["style"]
    navigation: {
      navigate: (route: keyof Config["navigation"]["routes"], params?: { [key: string]: string }) => void
    }
    state: {
      get: { [name in keyof States]: States[keyof States] }
      set: { [name in keyof States]: (v: States[keyof States]) => void }
    }
    colors: Config["appearance"]["colors"]
    setTheme: (theme: keyof Links["themes"]) => void
  }

type AppComponentStart<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Options extends ArchitectOptions,
  States extends AppComponentStates,
  Props extends AppComponentProps,
  > = {
    init?: (context: ArchitectContext<Config, Links, Options, States, Props>) => void
    render: (context: ArchitectContext<Config, Links, Options, States, Props>) => JSX.Element
  }

export const Architect = <Config extends AppConfig, Links extends AppLinksImports<Config>>(type: ArchitectType) => {
  return <Options extends ArchitectOptions>(options?: Options) => {
    let style: Options["style"] = {}
    if (typeof options?.style !== "undefined") {
      style = options.style
    }
    return <States extends AppComponentStates>(states?: States) => {
      return <Props extends AppComponentProps>(start: AppComponentStart<Config, Links, Options, States, Props>): AppComponent<Props> => {
        return props => {
          // NAVIGATION
          const navigation: NavigationProp<any> = type === ArchitectType.PAGE ? props.navigation : useNavigation()
          // THEME
          const { colors } = useTheme()
          // CONTEXT
          const context: ArchitectContext<Config, Links, Options, any, Props> = {
            colors,
            style,
            props: type === ArchitectType.PAGE ? props.route.params : props,
            state: { get: {}, set: {} },
            navigation: {
              navigate: (route, params) => {
                navigation.navigate(route, params)
              },
            },
            setTheme: theme => {
              console.log(theme)
            },
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
  }
}
