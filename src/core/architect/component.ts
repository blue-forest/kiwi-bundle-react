import { AppConfig } from "../app/config"
import { AppLinksImports } from "../app/links"
import { StyleSheetMediaQuery, StyleSheetStyle } from "../app/styles"
import { ArchitectContext } from "./context"

export enum ArchitectComponentType {
  COMPONENT,
  LAYOUT,
  PAGE,
}

export type ArchitectComponentProps = { [name: string]: any }

export type ArchitectComponentStyle = { [name: string]: StyleSheetStyle | StyleSheetMediaQuery[] }

export type ArchitectComponentStates = Required<{ [name: string]: any }>

export type ArchitectComponentValues = { [name: string]: any }

export type ArchitectComponentFunctions<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle,
  States extends ArchitectComponentStates,
  Values extends ArchitectComponentValues,
  Functions extends ArchitectComponentFunctions<Config, Links, Props, Style, States, Values, Functions>,
  > = {
    [name: string]: (context: ArchitectContext<Config, Links, Props, Style, States, Values, Functions>) => () => void
  }

export type ArchitectComponent<Props extends ArchitectComponentProps = {}> = React.ComponentType<Props>
