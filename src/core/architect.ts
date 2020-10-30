import { React } from "../vendors"
import { NavigationProp, useNavigation, useTheme } from "@react-navigation/native"
import { AppConfig } from "./app"
import { AppStyleSheet } from "./styles"

export enum ArchitectType {
  COMPONENT,
  LAYOUT,
  PAGE,
}

type States = { [name: string]: any }

type Props = { [name: string]: any }

type ArchitectOptions = {
  style?: AppStyleSheet
  init?: () => void
}

type ArchitectContext<Config extends AppConfig, Options extends ArchitectOptions, States, Props> = {
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

type AppComponentRender<Options extends AppConfig, Config extends ArchitectOptions, States, Props> = (
  context: ArchitectContext<Options, Config, States, Props>
) => JSX.Element

export const Architect = <Config extends AppConfig>(type: ArchitectType) => <Options extends ArchitectOptions>(options?: Options) => {
  let style: Options["style"] = {}
  if (typeof options?.style !== "undefined") {
    style = options.style
  }
  return <S extends States>(states?: S) => {
    return <P extends Props>(render: AppComponentRender<Config, Options, S, P>) => {
      return (props: any) => {
        // CONFIG
        if (typeof options !== "undefined") {
          // INIT
          if (typeof options.init !== "undefined") {
            React.useEffect(options.init, [])
          }
        }
        // NAVIGATION
        const navigation: NavigationProp<any> = type === ArchitectType.PAGE ? props.navigation : useNavigation()
        // THEME
        const { colors } = useTheme()
        // CONTEXT
        const context: ArchitectContext<Config, Options, any, P> = {
          props: type === ArchitectType.PAGE ? props.route.params : props,
          style,
          state: { get: {}, set: {} },
          navigation: {
            navigate: (route, params) => {
              navigation.navigate(route, params)
            },
          },
          colors,
        }
        // STATES
        if (typeof states !== "undefined") {
          Object.keys(states).forEach(name => {
            const state = React.useState(states[name])
            context.state.get[name] = state[0]
            context.state.set[name] = state[1]
          })
        }
        console.log("RENDER", context.state.get)
        return render(context)
      }
    }
  }
}
