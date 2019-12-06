import * as React from "react"
import { ComponentProps, Component } from "./Component"

interface VideoProps extends ComponentProps {
  sources: string[]
  keyPrefix: string
}

export class Video extends Component<VideoProps> {

  render() {
    const { sources, keyPrefix } = this.props
    return <video style={this.state.style} loop autoPlay>
      {sources.map((source, index) => {
        const split = source.split(".")
        const format = split[split.length - 1]
        return <source key={`${keyPrefix}-${index}`} src={source} type={`video/${format}`}/>
      })}
      {this.props.children}
    </video>
  }

}
