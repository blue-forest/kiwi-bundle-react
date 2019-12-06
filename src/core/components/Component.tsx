import * as React from "react"
import { logger } from "../client/logger"
import { StyleSheet } from "../styles"
import { Architect } from "../client/Architect"

export interface ComponentProps {
  style?: StyleSheet
}

export interface ComponentState {
  style: React.CSSProperties
}

export class Component<Props extends ComponentProps = ComponentProps, State extends ComponentState = ComponentState> extends React.PureComponent<Props, State> {
  architect: number | null = null
  state = {
    style: {},
  } as any

  constructor(props: Props) {
    super(props)
    if(typeof this.state === "undefined") {
      this.state = {} as State
    }
    if(typeof props.style !== "undefined") {
      this.architect = Architect.bind(props.style, style => {
        this.setState({ style })
      })
      if(this.architect !== null) {
        (this.state as State).style = Architect.getStyle(this.architect)
      }
    }
  }

  componentDidMount() {
    logger.logView(this, "Mounted  ")
  }

  componentDidUpdate() {
    logger.logView(this, "Updated")
  }

  componentWillUnmount() {
    if(this.architect !== null) {
      Architect.unbind(this.architect)
    }
    logger.logView(this, "Unmounted")
  }
}
