import { React, Kiwi } from "kiwi-bundle-react"
import { KBRD } from ".."
import { GlobalStore } from "../stores/global"

export const GlobalStoreLayout = KBRD.Component((self) =>
  self
    .onInit(({ update }) => {
      console.log({ type: "onInit", name: "GlobalStoreLayout" })
      GlobalStore.onUpdate.counter(update)
    })
    .render(() => {
      console.log({ type: "render", name: "GlobalStoreLayout" })
      return <Kiwi.View>
        <Kiwi.Text children={`Counter : ${GlobalStore.get.counter()}`} />
        <Kiwi.Button
          title="Add 10 to counter"
          onPress={() => {
            GlobalStore.set.counter(GlobalStore.get.counter() + 10)
          }}
        />
      </Kiwi.View>
    }),
)
