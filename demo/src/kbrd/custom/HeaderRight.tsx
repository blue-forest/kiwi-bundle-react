import { React, Kiwi, AppCustomHeaderRight } from "kiwi-bundle-react"
import { KBRD } from ".."
import MoreImage from "../../assets/more.svg"

export default KBRD.Custom<AppCustomHeaderRight>(() => (
  <Kiwi.TouchableOpacity style={{ padding: 20 }}>
    <Kiwi.Image source={MoreImage} style={{ height: 20, width: 20, resizeMode: "cover" }}/>
  </Kiwi.TouchableOpacity>
))
