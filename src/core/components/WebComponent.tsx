import * as React from "react"
import { Component, ReactFragment } from "react"
import { logger } from "../client/logger"

export interface WebComponentInterface {
  render: ReactFragment
}

export class WebComponent<Props = {}, S = {}, SS = any> extends Component<Props, S, SS> {

  constructor(props: Props) {
    super(props)
  }

  componentDidMount() {
    logger.logView(this, "Mounted")
  }

  componentDidUpdate() {
    logger.logView(this, "Update")
  }

}

export interface WebComponentConstructor {
  new(props?: any): WebComponent
}
