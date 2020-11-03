import { React } from "../../vendors"
import { AppLinksImports } from "../app/links"
import { NavigationProp, useNavigation, useTheme } from "@react-navigation/native"
import { ArchitectContext } from "./context"
import { ArchitectOptions } from "./options"
import { AppConfig } from "../app/config"
import {
  ArchitectComponentProps,
  ArchitectComponentStyle,
  ArchitectComponentStates,
  ArchitectComponentType,
  ArchitectComponent,
  ArchitectComponentFunctions,
  ArchitectComponentStores,
  ArchitectComponentValues,
} from "./component"

export type ArchitectRender<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle,
  States extends ArchitectComponentStates,
  Values extends ArchitectComponentValues,
  Functions extends ArchitectComponentFunctions,
  Stores extends ArchitectComponentStores<Config, Links, Props, Style, States, Values, Functions, Stores>,
  > = (
    render: (
      context: ArchitectContext<Config, Links, Props, Style, States, Values, Functions, Stores>
    ) => React.ReactElement
  ) => ArchitectComponent<Props>

export const ArchitectRender = <Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle = {},
  States extends ArchitectComponentStates = {},
  Values extends ArchitectComponentValues = {},
  Functions extends ArchitectComponentFunctions = {},
  Stores extends ArchitectComponentStores<Config, Links, Props, Style, States, Values, Functions, Stores> = any,
  >(
    options: ArchitectOptions<Config, Links, Props, Style, any, Values, Functions, Stores>
  ): ArchitectRender<Config, Links, Props, Style, States, Values, Functions, Stores> => render => {
    let started = false
    return props => {
      // PROPS
      options.context.props = options.type === ArchitectComponentType.PAGE ? props.route.params : props

      // NAVIGATION
      const navigation: NavigationProp<any> = options.type === ArchitectComponentType.PAGE ? props.navigation : useNavigation()
      options.context.navigation = {
        push: (route, params) => { navigation.navigate(route, params) },
      }

      // THEME COLORS
      const { colors } = useTheme()
      options.context.appearance.theme.colors = colors

      // STATES
      const states = options.cache.states
      if (typeof states !== "undefined") {
        Object.keys(states).forEach(name => {
          const state = React.useState(states[name])
          options.context.state.get[name] = state[0]
          options.context.state.set[name] = state[1]
        })
      }

      // INIT
      if (!started) {
        if (typeof options.cache.onInit !== "undefined") {
          options.cache.onInit(options.context)
        }
        started = true
      }

      // MOUNT / UNMOUNT
      React.useEffect(() => {
        if (typeof options.cache.onMount !== "undefined") {
          options.cache.onMount(options.context)
        }
        return () => {
          if (typeof options.cache.onUnmount !== "undefined") {
            options.cache.onUnmount(options.context)
          }
        }
      }, [])

      // RENDER
      return render(options.context)
    }
  }
