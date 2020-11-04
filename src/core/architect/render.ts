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
  > = (
    render: (
      context: ArchitectContext<Config, Links, Props, Style, States, Values, Functions>
    ) => React.ReactElement
  ) => ArchitectComponent<Props>

export const ArchitectRender = <Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle = {},
  States extends ArchitectComponentStates = {},
  Values extends ArchitectComponentValues = {},
  Functions extends ArchitectComponentFunctions = {},
  >(
    options: ArchitectOptions<Config, Links, Props, Style, any, Values, Functions>
  ): ArchitectRender<Config, Links, Props, Style, States, Values, Functions> => render => {
    let started = false
    return props => {
      // PROPS
      options.context.props = options.type === ArchitectComponentType.PAGE ? props.route.params : props

      // STATES
      const states = options.cache.states
      if (typeof states !== "undefined") {
        Object.keys(states).forEach(name => {
          const state = React.useState(states[name])
          options.context.states.get[name] = state[0]
          options.context.states.set[name] = state[1]
        })
      }

      // THEME COLORS
      const { colors } = useTheme()
      options.context.appearance.theme.colors = colors

      // NAVIGATION
      const navigation: NavigationProp<any> = options.type === ArchitectComponentType.PAGE ? props.navigation : useNavigation()
      options.context.navigation = {
        push: (route, params) => { navigation.navigate(route, params) },
      }

      // UPDATE
      const update = React.useReducer(u => ++u, 0)[1]
      options.context.update = () => { update() }

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
