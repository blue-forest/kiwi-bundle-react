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

export class Component<Props extends ComponentProps = ComponentProps, State extends ComponentState = ComponentState> extends React.Component<Props, State> {

  static getDerivedStateFromProps(props: ComponentProps, state: ComponentState) {
    state.$.style = Architect.updateStyle(state.$.architect, props.style)
    return null
  }

  constructor(props: Props) {
    super(props)
    if(typeof this.state === "undefined") {
      this.state = { $: { architect: -1, style: {} } } as State
    } else if(typeof this.state.$ === "undefined") {
      (this.state as State).$ = { architect: -1, style: {} } as State["$"]
    }
    if(typeof props.style !== "undefined") {
      this.state.$.architect = Architect.bind(style => {
        this.setState({ $: Object.assign(this.state.$, { style }) })
        this.forceUpdate()
      })
      this.state.$.style = Architect.updateStyle(this.state.$.architect, props.style)
    }
  }

  componentDidMount() {
    // logger.logView(this, "Mounted")
  }

  componentDidUpdate() {
    // logger.logView(this, "Updated")
  }

  componentWillUnmount() {
    Architect.unbind(this.state.$.architect)
    logger.logView(this, "Unmounted")
  }
}
