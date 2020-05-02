import { RouteComponentProps } from "react-router-dom"
import { Component, ComponentProps } from "./Component"

export type PageProps<Params = {}> = ComponentProps & RouteComponentProps<Params>

export class Page<Params = {}, State = {}> extends Component<PageProps<Params>, State> {
  getParams(): Params {
    return this.props.match.params
  }

  componentDidMount() {
    super.componentDidMount()
    // document.title = `${initialTitle} -`
  }
}

export interface PageConstructor {
  new(props: any): Page
}
