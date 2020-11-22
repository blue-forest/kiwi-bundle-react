//import { useNavigation } from "@react-navigation/native"
import {
  React,
  Kiwi,
  AppCustomHeaderLeft,
  AppCustomHeaderLeftBackButton,
} from "kiwi-bundle-react"
import { KBRD } from ".."

export default KBRD.Custom<AppCustomHeaderLeft>(
  ({ canGoBack, onPress }, { page, navigation }) => {
    if (page === "HOME") {
      return
    }
    return (
      <Kiwi.View>
        <AppCustomHeaderLeftBackButton
          onPress={() => {
            if (canGoBack) {
              if (typeof onPress !== "undefined") {
                onPress()
              }
            } else {
              navigation.push("HOME")
            }
          }}
        />
      </Kiwi.View>
    )
  },
)
