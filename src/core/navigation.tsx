import "./imports"
import { React, ReactNative } from "../vendors"
import { createStackNavigator } from "@react-navigation/stack"
import { LinkingOptions, NavigationContainer, PathConfigMap } from "@react-navigation/native"
import { AppComponent } from "./app"
import { AppLinks, AppOptions } from "./options"

export type NavigationCustom = {
  header: { left: AppComponent<{}>, right: AppComponent<{}> }
}

export const Navigation = <Options extends AppOptions>(
  options: Options,
  links: AppLinks<Options>,
): Promise<ReactNative.ComponentProvider> => {
  return Object.keys(links.pages).reduce<Promise<{ [page: string]: AppComponent<{}> }>>((promise, page) => promise.then(pages => {
    return links.pages[page].then(current => {
      pages[page] = current.default
      return pages
    })
  }), Promise.resolve({})).then(pages => {
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
  })
}
