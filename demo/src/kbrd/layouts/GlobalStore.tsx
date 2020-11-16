import { React, Kiwi } from "kiwi-bundle-react"
import { KBRD } from ".."
import { GlobalStore } from "../stores/global"

export const GlobalStoreLayout = KBRD.Component((self) =>
  self
    .onInit(({ update }) => {
      console.log({ type: "onInit", name: "GlobalStoreLayout" })
      GlobalStore.bind({ set: update })
    })
    .render(() => {
      console.log({ type: "render", name: "GlobalStoreLayout" })
      return <Kiwi.View>
        <Kiwi.Text children={`Counter : ${GlobalStore.data.get()?.counter || 0}`} />
      </Kiwi.View>
    }),
)
