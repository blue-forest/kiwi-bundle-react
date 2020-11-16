import { React, Kiwi } from "kiwi-bundle-react"
import { KBRD } from ".."
import { CounterLayout } from "../layouts/Counter"
import { GlobalStoreLayout } from "../layouts/GlobalStore"
import { ComponentsPageStyle } from "./Components.style"

type States = {
  count: number
  test: { test?: string }
}

type Values = {
  test: string
}

type Functions = {
  getText: () => string
  setText: (text: string) => void
}

export default KBRD.Page((self) =>
  self
    .style(ComponentsPageStyle)
    .states<States>({
      count: 0,
      test: {
        test: "test1",
      },
    })
    .values<Values>({
      test: "",
    })
    .functions<Functions>((context) => ({
      getText: () => context.values.test,
      setText: (text) => {
        context.values.test = text
      },
    }))
    .onInit(() => {
      console.log("COMPONENTS", "INIT")
    })
    .onMount(() => {
      console.log("COMPONENTS", "MOUNT")
    })
    .onUnmount(() => {
      console.log("COMPONENTS", "UNMOUNT")
    })
    .render(() => {
      console.log({ type: "render", name: "DataPage" })
      return (
        <Kiwi.View>
          <Kiwi.View>
            <Kiwi.Text>Global Store</Kiwi.Text>
            <GlobalStoreLayout/>
          </Kiwi.View>
          <Kiwi.View>
            <Kiwi.Text>Counter Layout</Kiwi.Text>
            <CounterLayout/>
          </Kiwi.View>
        </Kiwi.View>
      )
    }),
)
