import "./imports"
import { React, ReactNative } from "../vendors"
import { createStackNavigator } from "@react-navigation/stack"
import { LinkingOptions, NavigationContainer, PathConfigMap } from "@react-navigation/native"
import { AppRoutes } from "./app"
import { AppOptions } from "./options"

export const Navigation = (options: AppOptions, pages: AppRoutes): ReactNative.ComponentProvider => {
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
      return (
        <NavigationContainer linking={linking}>
          <Stack.Navigator screenOptions={{
            headerShown: !options.header?.hide,
            headerStyle: options.header?.style,
          }}>
          {Object.keys(pages).map(page => {
            const route = options.navigation.routes[page]
            let title = ""
            if(typeof options.web?.title !== "undefined") {
              if(typeof options.web.title === "string") {
                title = options.web.title
              } else {
                title = options.web.title(route.title)
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
