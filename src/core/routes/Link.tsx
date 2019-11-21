import * as React from "react"
import { WebComponent } from "../components/WebComponent"

export interface LinkAction {
  path: string
  call: () => void
}

interface Props {
  action: LinkAction
  className?: string
}

export class Link extends WebComponent<Props> {

  onClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault()
    this.props.action.call()
  }

  render() {
    const { action, className } = this.props
    return <a className={className} href={action.path} onClick={this.onClick.bind(this)}>
      {this.props.children}
    </a>
  }

}
