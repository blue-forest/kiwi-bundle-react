import "./imports"
import { React, ReactNative } from "../../vendors"
import { createStackNavigator, StackHeaderLeftButtonProps } from "@react-navigation/stack"
import {
  DefaultTheme,
  DocumentTitleOptions,
  LinkingOptions,
  NavigationContainer,
  PathConfigMap,
  Theme,
} from "@react-navigation/native"
import { AppLinks, AppLinksCustom } from "../app/links"
import { AppConfig } from "../app/config"
import { AppOptions } from "../app/options"
import { i18n } from "dropin-client"

export const Provider = <Config extends AppConfig, Links extends AppLinks<Config>>(
  config: Config,
  links: Links,
  options: AppOptions,
): ReactNative.ComponentProvider => {

  // LINKING
  const Stack = createStackNavigator()
  const linking: LinkingOptions = {
    enabled: true,
    prefixes: config.navigation.prefixes,
    config: {
      screens: Object.keys(config.navigation.routes).reduce<PathConfigMap>((screens, route) => {
        screens[route] = {
          exact: true,
          path: config.navigation.routes[route].path,
        }
        return screens
      }, {}),
    },
  }

  // TITLE
  let documentTitle: DocumentTitleOptions | undefined
  if(ReactNative.Platform.OS === "web" && typeof config.platforms?.web?.title !== "undefined") {
    const configTitle = config.platforms?.web?.title
    documentTitle = {
      enabled: true,
      formatter: (_, route) => {
        if(typeof configTitle === "string") return configTitle
        if(typeof route !== "undefined" && typeof config.navigation.routes[route.name]?.title !== "undefined") {
          return configTitle(i18n(config.navigation.routes[route.name].title || ""))
        }
        return ""
      },
    }
  }

  // THEME
  const generateTheme = (scheme: ReactNative.ColorSchemeName): Theme => {
    if(typeof links.themes !== "undefined") {
      const first: any = Object.values(links.themes)[0]
      return {
        dark: scheme === "dark",
        colors: (Object.keys(first) as (keyof Theme["colors"])[]).reduce<Partial<Theme["colors"]>>((all, key) => {
          if(typeof first[key] === "function") all[key] = first[key](config.appearance.colors)
          if(typeof first[key] === "object") all[key] = first[key][scheme || "light"]
          return all
        }, {}) as Theme["colors"]
      }
    }
    return DefaultTheme
  }

  return () => {

    return () => {

      // THEME
      let themeName = "default"
      const [ theme, setTheme ] = React.useState<Theme>(generateTheme(ReactNative.useColorScheme()))
      options.actions.theme.name.bind({ get: () => themeName })
      options.actions.theme.scheme.bind({ get: () => theme.dark ? "dark" : "light" })
      React.useEffect(() => {
        options.actions.theme.name.bind({
          set: name => {
            console.log("load", name)
          },
        })
        options.actions.theme.scheme.bind({
          set: scheme => {
            if((scheme === "dark") !== theme.dark) {
              setTheme(generateTheme(scheme))
            }
          },
        })
      }, [ theme ])

      // RENDER
      console.log("RENDER -", "NAVIGATION")
      return (
        <NavigationContainer linking={linking} documentTitle={documentTitle} theme={theme}>
          <Stack.Navigator
            screenOptions={screenProps => ({
              headerShown: !config.appearance.header?.hide,
              cardStyle: ReactNative.Platform.OS === "web" ? {
                height: "100vh",
              } : {},
              headerStyle: [
                {
                  borderBottomWidth: 0,
                },
                config.appearance.header?.style,
              ],
              headerLeft: typeof links.custom?.header?.left === "undefined" ? undefined : (props) => {
                return (links.custom?.header?.left as AppLinksCustom<Config, StackHeaderLeftButtonProps>)(props, {
                  page: screenProps.route.name,
                  navigation: screenProps.navigation,
                })
              },
              headerRight: typeof links.custom?.header?.right === "undefined" ? undefined : props => {
                return (links.custom?.header?.right as AppLinksCustom<Config, {}>)(props, {
                  page: screenProps.route.name,
                  navigation: screenProps.navigation,
                })
              },
            })}
            children={Object.keys(links.pages).map(page => {
              const route = config.navigation.routes[page]
              return <Stack.Screen
                key={page}
                name={page}
                component={links.pages[page]}
                options={{
                  headerTitle: route.header?.hideTitle ? "" : i18n(route.title || ""),
                }}
              />
            }
          )}
        />
        </NavigationContainer>
      )
    }
  }
}
