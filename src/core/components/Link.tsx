import * as React from "react"
import { XOR } from "dropin-recipes"
import { ComponentProps, Component } from "./Component"
import { Router } from "../client/router"

type LinkProps = ComponentProps & XOR<{ onClick: () => void }, XOR<{
  path: string
  target?: string
}, {
  route: string
}>>

export class Link extends Component<LinkProps> {
  href: string = ""

  constructor(props: LinkProps) {
    super(props)
    if(typeof props.path !== "undefined") {
      this.href = props.path
    } else if(typeof props.route !== "undefined") {
      this.href = props.route
    }
  }

  onClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    if(typeof this.props.target === "undefined") {
      event.preventDefault()
    }
    if(typeof this.props.route !== "undefined") {
      Router.history.push(this.props.route)
    }
    if(typeof this.props.onClick !== "undefined") {
      this.props.onClick()
    }
  }

  render() {
    const { path, target } = this.props
    return <a
      href={this.href}
      onClick={this.onClick.bind(this)}
      children={this.props.children}
      target={target}
      style={this.state.style}
    />
  }

}
