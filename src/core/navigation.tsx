import "./imports"
import { React, ReactNative } from "../vendors"
import { createStackNavigator } from "@react-navigation/stack"
import { LinkingOptions, NavigationContainer, PathConfigMap } from "@react-navigation/native"
import { AppComponent, AppRoutes } from "./app"
import { AppOptions } from "./options"

export type NavigationCustom = {
  header: { left: AppComponent<{}>, right: AppComponent<{}> }
}

export const Navigation = <
  Options extends AppOptions,
  Routes extends AppRoutes<Options["navigation"]["routes"]>,
>(options: Options, pages: Routes, custom?: NavigationCustom): ReactNative.ComponentProvider => {
  console.log(custom)
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
      console.log(scheme)
      return (
        <NavigationContainer linking={linking}>
          <Stack.Navigator screenOptions={{
            headerShown: !options.appearance.header?.hide,
            headerStyle: options.appearance.header?.style,
          }}>
          {Object.keys(pages).map(page => {
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
