import * as React from "react"
import { Component, ComponentConstructor } from "./Component"
import { ListElement } from "./ListElement"

interface Props {
  children: ListElement[] // ComponentConstructor<ListElement>[]
}

export class List extends Component<Props> {
  render() {
    return <ul children={this.props.children}/>
  }
}
