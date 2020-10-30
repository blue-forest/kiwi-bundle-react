import { React } from "../vendors"
import { NavigationProp, useNavigation, useTheme } from "@react-navigation/native"
import { AppConfig } from "./app"
import { AppStyleSheet } from "./styles"

export enum ArchitectType {
  COMPONENT,
  LAYOUT,
  PAGE,
}

type ArchitectStates = { [name: string]: any }

type ArchitectProps = { [name: string]: any }

type ArchitectContext<Config extends AppConfig, Options extends ArchitectOptions<Config, Options, States, Props>, States, Props> = {
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
}

type ArchitectOptions<Config extends AppConfig, Options extends ArchitectOptions<Config, Options, States, Props>, States, Props> = {
  style?: AppStyleSheet
  init?: (context: ArchitectContext<Config, Options, States, Props>) => void
}

type AppComponentRender<Config extends AppConfig, Options extends ArchitectOptions<Config, Options, States, Props>, States, Props> = (
  context: ArchitectContext<Config, Options, States, Props>
) => JSX.Element

export const Architect = <Config extends AppConfig>(
  type: ArchitectType
) => <Options extends ArchitectOptions<Config, Options, States, Props>>(options?: Options) => {
  let style: Options["style"] = {}
  if (typeof options?.style !== "undefined") {
    style = options.style
  }
  return <States extends ArchitectStates>(states?: States) => {
    return <Props extends ArchitectProps>(render: AppComponentRender<Config, Options, States, Props>) => {
      return (props: any) => {
        // NAVIGATION
        const navigation: NavigationProp<any> = type === ArchitectType.PAGE ? props.navigation : useNavigation()
        // THEME
        const { colors } = useTheme()
        // CONTEXT
        const context: ArchitectContext<Config, Options, any, Props> = {
          colors,
          style,
          props: type === ArchitectType.PAGE ? props.route.params : props,
          state: { get: {}, set: {} },
          navigation: {
            navigate: (route, params) => {
              navigation.navigate(route, params)
            },
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
        // CONFIG
        if (typeof options !== "undefined") {
          // INIT
          if (typeof options.init !== "undefined") {
            const init = options.init
            React.useEffect(() => {
              init(context)
            }, [])
          }
        }
        return render(context)
      }
    }
  }
}
