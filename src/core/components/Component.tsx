import * as React from "react"
import { logger } from "../client/logger"
import { StyleSheet } from "../styles"
import { Architect } from "../client/Architect"

export interface ComponentProps {
  style?: StyleSheet
}

export interface ComponentState {
  $: {
    architect: number
    style: React.CSSProperties
  }
}

export class Component<Props extends ComponentProps = ComponentProps, State extends ComponentState = ComponentState> extends React.PureComponent<Props, State> {
  state = {
    $: {
      architect: -1,
      style: {},
    }
  } as State

  static getDerivedStateFromProps(props: ComponentProps, state: ComponentState) {
    state.$.style = Architect.updateStyle(state.$.architect, props.style)
    return null
  }

  constructor(props: Props) {
    super(props)
    if(typeof props.style !== "undefined") {
      this.state.$.architect = Architect.bind(style => {
        let previous = this.state.$
        previous.style = style
        this.setState({ $: previous })
      })
      this.state.$.style = Architect.updateStyle(this.state.$.architect, props.style)
    }
  }

  componentDidMount() {
    logger.logView(this, "Mounted")
  }

  componentDidUpdate() {
    console.log(this.props.style)
    logger.logView(this, "Updated")
  }

  componentWillUnmount() {
    Architect.unbind(this.state.$.architect)
    logger.logView(this, "Unmounted")
  }
}
