import "./imports"
import { React, ReactNative } from "../vendors"
import { createStackNavigator } from "@react-navigation/stack"
import { LinkingOptions, NavigationContainer, PathConfigMap } from "@react-navigation/native"
import { AppRoutes } from "./app"
import { AppOptions } from "./options"

export const Navigation = (options: AppOptions, pages: AppRoutes): ReactNative.ComponentProvider => {
  const Stack = createStackNavigator()
  const linking: LinkingOptions = {
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
      return (
        <NavigationContainer linking={linking}>
          <Stack.Navigator>
          {Object.keys(pages).map(page => {
            const route = options.navigation.routes[page]
            let title = ""
            if(typeof options.navigation.title !== "undefined") {
              if(typeof options.navigation.title === "string") {
                title = options.navigation.title
              } else {
                title = options.navigation.title(route.title)
              }
            }
            return <Stack.Screen
              key={page}
              name={page}
              component={pages[page]}
              options={{ title, headerTitle: route.title }}
            />
          })}
        </Stack.Navigator>
        </NavigationContainer>
      )
    }
  }
}
