import "./imports"
import { React, ReactNative } from "../vendors"
import { createStackNavigator } from "@react-navigation/stack"
import { DocumentTitleOptions, LinkingOptions, NavigationContainer, PathConfigMap } from "@react-navigation/native"
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
  return () => {
    return () => {
      // todo choose theme ?
      // const colors = links.themes?.default
      // let themeColors = DefaultTheme.colors
      // Object.keys(themeColors).map(i => {
      //   if (typeof colors !== "undefined") {
      //     if (typeof colors[i] !== "undefined") {
      //
      //     }
      //   }
      //   themeColors[i] = colors ? colors[i] : ""
      // })
      //const [ theme, setTheme ] = useState(ReactNative.useColorScheme())

      let documentTitle: DocumentTitleOptions | undefined
      if(typeof config.platforms?.web?.title !== "undefined") {
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

      return (
        <NavigationContainer
            linking={linking}
            documentTitle={documentTitle}
            /*theme={{
              dark: scheme === "dark",
              colors: DefaultTheme.colors // themeColors
            }}*/>
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
