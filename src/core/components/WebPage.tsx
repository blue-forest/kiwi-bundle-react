import { Component, ReactNode } from "react"
import { RouteComponentProps } from "react-router-dom"
import { logger } from "../client/logger"

interface WebPageType {
  getTitle?: () => string
  render: () => ReactNode
}

export class WebPage<Params = {}> extends Component<RouteComponentProps> implements WebPageType {
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

export interface WebPageConstructor {
  new(props?: any): WebPage
}
