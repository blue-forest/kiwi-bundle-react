import * as React from "react"
import { Component } from "./Component"
import { Router } from "../router"

export interface LinkAction {
  path: string
  external: boolean
  call: (() => void)
}

interface Props {
  action: string | LinkAction
  target?: string
}

export class Link extends Component<Props> {
  action: LinkAction

  constructor(props: Props) {
    super(props)
    this.action = typeof props.action === "string" ? Router.getLinkAction(props.action, true) : props.action
  }

  onClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    if(!this.action.external) {
      event.preventDefault()
    }
    this.action.call()
  }

  render() {
    const { action, target } = this.props
    return <a
      href={this.action.path}
      onClick={this.onClick.bind(this)}
      children={this.props.children}
      target={target}
    />
  }

}
