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

export class Component<Props extends ComponentProps = ComponentProps, State extends ComponentState = ComponentState> extends React.PureComponent<Props, State> {
  architectId = -1
  state = {
    style: {},
  } as State

  constructor(props: Props) {
    super(props)
    if(typeof props.style !== "undefined") {
      this.architectId = Architect.bind(props.style, style => {
        this.setState({ style })
      })
      if(this.architectId !== -1) {
        this.state.style = Architect.getStyle(this.architectId)
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
    if(this.architectId !== -1) {
      Architect.unbind(this.architectId)
    }
    logger.logView(this, "Unmounted")
  }
}
