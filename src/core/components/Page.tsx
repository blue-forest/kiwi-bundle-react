import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { logger } from "../client/logger"

interface PageType {
  getTitle?: () => string
  render: () => React.ReactNode
}

export class Page<Params = {}> extends React.Component<RouteComponentProps> implements PageType {
  params: Params

  constructor(props: any) {
    super(props)
    this.params = props.match.params
  }

  componentDidMount() {
    // document.title = `${initialTitle} -`
    logger.logView(this, "Mounted")
  }

  componentDidUpdate() {
    logger.logView(this, "Update")
  }

}

export interface PageConstructor {
  new(props?: any): Page
}
