import "./imports"
import { createStackNavigator } from "@react-navigation/stack"
import { LinkingOptions, NavigationContainer } from "@react-navigation/native"
import { AppRoutes } from "./app"
import { React, ReactNative } from "../vendors"

export type NavigationOptions = {
  prefixes: string[]
  routes: { [name: string]: { path: string } }
}

export const Navigation = (options: NavigationOptions, pages: AppRoutes): ReactNative.ComponentProvider => {
  const Stack = createStackNavigator()
  const linking: LinkingOptions = {
    prefixes: options.prefixes,
    config: {
      screens: options.routes,
    },
  }
  return () => {
    return () => {
      return (
        <NavigationContainer linking={linking}>
          <Stack.Navigator>
          {Object.keys(pages).map(page => {
            return <Stack.Screen key={page} name={page} component={pages[page]} />
          })}
        </Stack.Navigator>
        </NavigationContainer>
      )
    }
  }
}
