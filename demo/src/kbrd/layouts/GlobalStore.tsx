import { React, Kiwi } from "kiwi-bundle-react"
import { KBRD } from ".."
import { GlobalStore } from "../stores/global"

export const GlobalStoreLayout = KBRD.Component((self) =>
  self
    .stores([
      GlobalStore.bind([ "counter" ]),
    ])
    .render(({ stores }) => {
      console.log({ type: "render", name: "GlobalStoreLayout" })
      return <Kiwi.View>
        <Kiwi.Text children={`Counter : ${stores.global.get.counter}`} />
        <Kiwi.Button
          title="Add 10 to counter"
          onPress={() => {
            stores.global.set.counter(stores.global.get.counter + 10)
          }}
        />
      </Kiwi.View>
    }),
)
