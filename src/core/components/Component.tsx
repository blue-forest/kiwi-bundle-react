import React from "react"
import { logger } from "../client/logger"
import { StyleSheetData } from "../styles"

type ComponentExtraProps<Props> = Props & {
  style?: React.CSSProperties
}

export class Component<Props = {}, S = {}, SS = any> extends React.Component<ComponentExtraProps<Props>, S, SS> {

  constructor(props: Props) {
    super(props)
  }

  componentDidMount() {
    logger.logView(this, "Mounted")
  }

  componentDidUpdate() {
    logger.logView(this, "Updated")
  }

}

export interface ComponentConstructor<Props= {}> {
  new(props?: Props): Component
}

interface KiwiBundleComponentRender<Props> {
  props: Props
  architect: (style: StyleSheetData) => React.CSSProperties
}

export interface KiwiBundleComponent<Props> {
  render(data: KiwiBundleComponentRender<Props>): React.ReactNode
}
