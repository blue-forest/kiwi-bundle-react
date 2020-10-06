import { React, ReactNative, Kiwi } from "kiwi-bundle-react"
import { HomePageStyle } from "../pages/Home.style"

type ButtonLayoutProps = {
  title: string
  onPress: () => void
  containerStyle?: ReactNative.StyleProp<ReactNative.ViewStyle>
}

export const ButtonLayout = (props: ButtonLayoutProps) => {
  console.log("ButtonLayout render")
  return (
    <Kiwi.View style={[HomePageStyle.button, props.containerStyle]}>
      <Kiwi.Button title={props.title} onPress={props.onPress} />
    </Kiwi.View>
  )
}
