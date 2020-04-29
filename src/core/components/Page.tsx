import * as React from "react"
import { RouteComponentProps } from "react-router-dom"
import { logger } from "../client/logger"

export class Page<Params = {}, State = {}> extends React.PureComponent<RouteComponentProps, State> {
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
    logger.logView(this, "Updated")
  }
}

export interface PageConstructor {
  new(props: any): Page
}
