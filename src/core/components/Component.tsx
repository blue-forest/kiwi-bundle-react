import React from "react"
import { logger } from "../client/logger"

export interface ComponentInterface {
  render: React.ReactFragment
}

export class Component<Props = {}, S = {}, SS = any> extends React.Component<Props, S, SS> {

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

export interface ComponentConstructor {
  new(props?: any): Component
}
