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
    options: ArchitectOptions<Config, Links, Props, Style, Stores, States, Values, Functions>
  ): ArchitectRender<Config, Links, Props, Style, Stores, States, Values, Functions> => render => {
    /*let style: Options["style"] = {}
    if (typeof options?.style !== "undefined") {
      style = options.style
    }*/
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

      // INIT
      /*if (typeof start.init !== "undefined") {
        const init = start.init
        React.useEffect(() => {
          init(context)
        }, [])
      }*/

      return render(options.context)
    }
  }
