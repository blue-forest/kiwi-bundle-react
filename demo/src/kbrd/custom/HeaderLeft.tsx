import { React, Kiwi, AppCustomHeaderLeft, AppCustomHeaderLeftBackButton } from "kiwi-bundle-react"
import { KBRD } from ".."

export default KBRD.Custom<AppCustomHeaderLeft>(({ canGoBack, onPress }, page) => {
  console.log(page)
  if(!canGoBack) return
  return <Kiwi.View>
    <AppCustomHeaderLeftBackButton onPress={onPress}/>
  </Kiwi.View>
})
