import { React, Kiwi } from "kiwi-bundle-react"
import { KBRD } from "../app"

type Props = {
  first: string
  second: string
}

export const ParamsPage = KBRD.Page()()<Props>(({ props }) => (
  <Kiwi.View>
    {console.log(props)}
    <Kiwi.Text>Params</Kiwi.Text>
    <Kiwi.Text>First : {props.first}</Kiwi.Text>
    <Kiwi.Text>Second : {props.second}</Kiwi.Text>
  </Kiwi.View>
))
