import * as React from "react"
import { logger } from "../client/logger"
import { StyleSheet } from "../styles"
import { Architect } from "../client/Architect"

export interface ComponentProps {
  style?: StyleSheet
}

export interface ComponentState {
  style?: React.CSSProperties
}

export class Component<Props extends ComponentProps = ComponentProps, State extends ComponentState = ComponentState>
  extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    if(typeof this.state === "undefined") {
      this.state = {} as State
    }
    if(typeof props.style !== "undefined") {
      (this.state as State).style = Architect.bind(props.style, style => {
        this.setState({ style })
      })
    }
  }

  componentDidMount() {
    logger.logView(this, "Mounted")
  }

  componentDidUpdate() {
    logger.logView(this, "Updated")
  }

}

interface KiwiBundleComponentRender<Props> {
  props: Props
}

export interface KiwiBundleComponent<Props> {
  render(data: KiwiBundleComponentRender<Props>): React.ReactNode
}
