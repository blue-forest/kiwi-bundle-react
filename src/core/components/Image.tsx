import * as React from "react"
import { ComponentProps, Component } from "./Component"

interface ImageProps extends ComponentProps {
  source: string
  alt?: string
}

export class Image extends Component<ImageProps> {

  render() {
    const { source } = this.props
    return <img src={source} alt={this.props.alt} style={this.state.style}/>
  }

}
