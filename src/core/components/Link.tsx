import * as React from "react"
import { Component } from "./Component"
import { Router } from "../router"

export type LinkAction = { path: string, call: (() => void) }

interface Props {
  action: string | LinkAction
  target?: string
}

export class Link extends Component<Props> {
  action: LinkAction

  constructor(props: Props) {
    super(props)
    this.action = typeof props.action === "string" ? Router.getLinkAction(props.action) : props.action
  }

  onClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault()
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
