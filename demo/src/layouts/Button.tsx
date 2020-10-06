import { React, Kiwi } from "../vendors/kiwi-bundle-react"
import { HomePageStyle } from "../pages/Home.style"

type ButtonLayoutProps = {
  title: string
  onPress: () => void
  containerStyle?: Kiwi.StyleProp<Kiwi.ViewStyle>
}

export const ButtonLayout = (props: ButtonLayoutProps) => {
  console.log("ButtonLayout render")
  return (
    <Kiwi.View style={[HomePageStyle.button, props.containerStyle]}>
      <Kiwi.Button title={props.title} onPress={props.onPress} />
    </Kiwi.View>
  )
}
