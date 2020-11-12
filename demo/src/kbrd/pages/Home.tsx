import { React, ReactNative, Kiwi } from "kiwi-bundle-react"
import { KBRD } from ".."
import { HomePageStyle } from "./Home.style"
import CoverImage from "../../assets/cover.png"

export default KBRD.Page((self) =>
  self.style(HomePageStyle).render(({ style, navigation }) => (
    <ReactNative.SafeAreaView style={style.container}>
      <Kiwi.Image source={CoverImage} style={style.cover} />
      <Kiwi.Button
        title="Components"
        containerStyle={style.button}
        onPress={() => {
          navigation.push("COMPONENTS")
        }}
      />
      <Kiwi.Button
        title="Styles"
        containerStyle={style.button}
        onPress={() => {
          navigation.push("STYLES")
        }}
      />
      <Kiwi.Button
        title="Data"
        containerStyle={style.button}
        onPress={() => {
          navigation.push("DATA")
        }}
      />
      <Kiwi.Button
        title="Navigation"
        containerStyle={style.button}
        onPress={() => {
          navigation.push("NAVIGATION", {
            first: "it",
            second: "works",
            very: "well",
          })
        }}
      />
      <Kiwi.Button
        title="Tools"
        containerStyle={style.button}
        onPress={() => {}}
      />
    </ReactNative.SafeAreaView>
  )),
)
