import { React, Kiwi } from "kiwi-bundle-react"
import { KBRD } from ".."

type Props = {
  first: string
  second: string
  very?: string
}

export default KBRD.Page()()<Props>({
  render: ({ props }) => (
    <Kiwi.View>
      <Kiwi.Text>Route ":first" parameter : {props.first}</Kiwi.Text>
      <Kiwi.Text>Route ":second" parameter : {props.second}</Kiwi.Text>
      <Kiwi.Text>Extra parameter "very" : {props.very}</Kiwi.Text>
    </Kiwi.View>
  ),
})
