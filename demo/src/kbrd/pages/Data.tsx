import { React, Kiwi } from "kiwi-bundle-react"
import { KBRD } from ".."
import { CounterGlobalLayout } from "../layouts/CounterGlobal"
import { CounterLocalLayout } from "../layouts/CounterLocal"
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
      console.log({ type: "init", name: "DataPage" })
    })
    .onMount(() => {
      console.log({ type: "mount", name: "DataPage" })
    })
    .onUnmount(() => {
      console.log({ type: "unmount", name: "DataPage" })
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
            <Kiwi.Text>Local Counter Layout</Kiwi.Text>
            <CounterLocalLayout/>
          </Kiwi.View>
          <Kiwi.View>
            <Kiwi.Text>Global Counter Layout</Kiwi.Text>
            <CounterGlobalLayout/>
          </Kiwi.View>
        </Kiwi.View>
      )
    }),
)
