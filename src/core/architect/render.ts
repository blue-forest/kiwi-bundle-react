import { React } from "../../vendors"
import { AppComponent, AppComponentProps, AppComponentStates, AppConfig } from "../app"
import { AppLinksImports } from "../links"
import { AppStyleSheet } from "../styles"
import { NavigationProp, useNavigation, useTheme } from "@react-navigation/native"
import { ArchitectType } from "."
import { ArchitectContext } from "./context"
import { ArchitectOptions } from "./options"

export type ArchitectRender<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends AppComponentProps,
  Style extends AppStyleSheet,
  Stores,
  States extends AppComponentStates,
  Values,
  Functions,
  > = (
    render: (
      context: ArchitectContext<Config, Links, Props, Style, Stores, States, Values, Functions>
    ) => React.ReactElement
  ) => AppComponent<Props>

export const ArchitectRender = <Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends AppComponentProps,
  Style extends AppStyleSheet = any,
  Stores = any,
  States extends AppComponentStates = any,
  Values = any,
  Functions = any,
  >(
    options: ArchitectOptions<Config, Links, Props, Style, Stores, any, Values, Functions>
  ): ArchitectRender<Config, Links, Props, Style, Stores, States, Values, Functions> => render => {
    let started = false
    return props => {
      // PROPS
      options.context.props = options.type === ArchitectType.PAGE ? props.route.params : props

      // NAVIGATION
      const navigation: NavigationProp<any> = options.type === ArchitectType.PAGE ? props.navigation : useNavigation()
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
