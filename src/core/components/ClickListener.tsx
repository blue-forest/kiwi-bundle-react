import * as React from "react"
import { ComponentProps } from "./Component"

interface Props extends ComponentProps {
  onOutsideClick?: (event: MouseEvent) => void
  className?: string
}

export class ClickListener extends React.PureComponent<Props> {
  wrapperNode: any

  componentDidMount() {
    document.addEventListener("click", this.handleClick.bind(this))
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick.bind(this))
  }

  handleClick(event: MouseEvent) {
    if(this.wrapperNode && !this.wrapperNode.contains(event.target) && typeof this.props.onOutsideClick !== "undefined") {
      this.props.onOutsideClick(event)
    }
  }

  render() {
    return <div
      ref={node => { this.wrapperNode = node }}
      children={this.props.children}
      className={this.props.className}
    />
  }
}
