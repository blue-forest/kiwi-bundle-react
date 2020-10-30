import "./imports"
import { React, ReactNative } from "../vendors"
import { createStackNavigator } from "@react-navigation/stack"
import { DefaultTheme, DocumentTitleOptions, LinkingOptions, NavigationContainer, PathConfigMap, Theme } from "@react-navigation/native"
import { AppConfig } from "./app"
import { AppLinks } from "./links"

export const Navigation = <Config extends AppConfig>(config: Config, links: AppLinks<Config>): ReactNative.ComponentProvider => {
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
          return configTitle(config.navigation.routes[route.name].title)
        }
        return ""
      },
    }
  }
  return () => {
    return () => {
      // THEME
      let currentTheme: Theme
      if(typeof links.themes !== "undefined") {
        const scheme = ReactNative.useColorScheme()
        const first: any = Object.values(links.themes)[0]
        currentTheme = {
          dark: scheme === "dark",
          colors: (Object.keys(first) as (keyof Theme["colors"])[]).reduce<Partial<Theme["colors"]>>((all, key) => {
            if(typeof first[key] === "function") {
              all[key] = first[key](config.appearance.colors)
            }
            if(typeof first[key] === "object") {
              all[key] = first[key][scheme || "light"]
            }
            return all
          }, {}) as Theme["colors"]
        }
      } else {
        currentTheme = DefaultTheme
      }
      const [ theme ] = React.useState<Theme>(currentTheme)
      // RENDER
      return (
        <NavigationContainer linking={linking} documentTitle={documentTitle} theme={theme}>
          <Stack.Navigator screenOptions={{
            headerShown: !config.appearance.header?.hide,
            headerStyle: config.appearance.header?.style,
          }}>
          {Object.keys(links.pages).map(page => {
            const route = config.navigation.routes[page]
            return <Stack.Screen
              key={page}
              name={page}
              component={links.pages[page]}
              options={{
                headerTitle: route.title,
                headerLeft: links.custom?.header?.left,
                headerRight: links.custom?.header?.right,
              }}
            />
          })}
        </Stack.Navigator>
        </NavigationContainer>
      )
    }
  }
}
