import "./imports"
import { React, ReactNative } from "../vendors"
import { createStackNavigator } from "@react-navigation/stack"
import {DefaultTheme, LinkingOptions, NavigationContainer, PathConfigMap} from "@react-navigation/native"
import { AppLinks, AppOptions } from "./options"

export const Navigation = <Options extends AppOptions>(options: Options, links: AppLinks<Options>): ReactNative.ComponentProvider => {
  const Stack = createStackNavigator()
  const linking: LinkingOptions = {
    enabled: true,
    prefixes: options.navigation.prefixes,
    config: {
      screens: Object.keys(options.navigation.routes).reduce<PathConfigMap>((screens, route) => {
        screens[route] = {
          exact: true,
          path: options.navigation.routes[route].path,
        }
        return screens
      }, {}),
    },
  }
  return () => {
    return () => {
      const scheme = ReactNative.useColorScheme()
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
      return (
        <NavigationContainer
            linking={linking}
            theme={{
              dark: scheme === "dark",
              colors: DefaultTheme.colors // themeColors
            }}>
          <Stack.Navigator screenOptions={{
            headerShown: !options.appearance.header?.hide,
            headerStyle: options.appearance.header?.style,
          }}>
          {Object.keys(links.pages).map(page => {
            const route = options.navigation.routes[page]
            let title = ""
            if(typeof options.platforms?.web?.title !== "undefined") {
              if(typeof options.platforms?.web.title === "string") {
                title = options.platforms?.web.title
              } else {
                title = options.platforms?.web.title(route.title)
              }
            }
            return <Stack.Screen
              key={page}
              name={page}
              children={links.pages[page]}
              options={{
                title,
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
