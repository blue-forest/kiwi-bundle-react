import * as React from "react"
import { XOR } from "dropin-recipes"
import { ComponentProps, Component } from "./Component"
import { Router } from "../router"

type Props = ComponentProps & XOR<{
  path: string
  target?: string
}, {
  route: string
}>

export class Link extends Component<Props> {
  href: string = ""

  constructor(props: Props) {
    super(props)
    if(typeof props.path !== "undefined") {
      this.href = props.path
    } else if(typeof props.route !== "undefined") {
      this.href = props.route
    }
  }

  onClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    if(typeof this.props.route !== "undefined") {
      event.preventDefault()
      Router.history.push(this.props.route)
    }
  }

  render() {
    const { path, target, route } = this.props
    return <a
      href={this.href}
      onClick={this.onClick.bind(this)}
      children={this.props.children}
      target={target}
    />
  }

}
