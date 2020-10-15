import "./imports"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import { React, ReactNative } from "../vendors"
import * as Kiwi from "../kiwi"

export const Navigation = () => {
  const Stack = createStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator>
      {/*Object.values(routes).map((page) => {
        <Stack.Screen name="Home" component={page} />
      })*/}
      <Stack.Screen name="Home" children={() => <ReactNative.View>
        <Kiwi.Text
          onPress={() => { console.log("TEST 1") }}
          onLongPress={() => { console.log("TEST 2") }}
        >Test</Kiwi.Text>
      </ReactNative.View>} />
    </Stack.Navigator>
    </NavigationContainer>
  )
}
