import React from "react"
import { logger } from "../client/logger"

type ComponentProps<Props> = Props & { style?: StyleSheet | undefined }

export class Component<Props = {}, S = {}, SS = any> extends React.Component<ComponentProps<Props>, S, SS> {

  constructor(props: ComponentProps<Props>) {
    super(props)
  }

  componentDidMount() {
    logger.logView(this, "Mounted")
  }

  componentDidUpdate() {
    logger.logView(this, "Updated")
  }

}

export interface ComponentConstructor<Type extends Component> {
  new(props?: Type["props"]): Type
}
