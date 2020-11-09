import { React, ReactNative, Kiwi } from "kiwi-bundle-react"
import { KBRD } from ".."
import { HomePageStyle } from "./Home.style"
import CoverImage from "../../assets/cover.png"

export default KBRD.Page(self => self
  .style(HomePageStyle)
  .render(({ style }) => (
    <ReactNative.SafeAreaView style={style.container}>
      <Kiwi.Image source={CoverImage} style={style.cover}/>
    </ReactNative.SafeAreaView>
  ))
)
