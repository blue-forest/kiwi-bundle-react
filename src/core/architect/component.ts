import { AppConfig } from "../app/config"
import { AppLinksImports } from "../app/links"
import { StyleSheetMediaQuery, StyleSheetStyle } from "../styles"
import { ArchitectContext } from "./context"

export enum ArchitectComponentType {
  COMPONENT,
  LAYOUT,
  PAGE,
}

export type ArchitectComponentProps = { [name: string]: any }

export type ArchitectComponentStyle = {
  [name: string]: StyleSheetStyle | StyleSheetMediaQuery[]
}

export type ArchitectComponentStates = { [name: string]: any }

export type ArchitectComponentValues = { [name: string]: any }

export type ArchitectComponentFunctions = { [name: string]: () => void }

export type ArchitectComponentStores<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle,
  States extends ArchitectComponentStates,
  Values extends ArchitectComponentValues,
  Functions extends ArchitectComponentFunctions,
  Stores extends ArchitectComponentStores<Config, Links, Props, Style, States, Values, Functions, Stores>,
  > = {
    [name in keyof Links["stores"]]?: (
      context: ArchitectContext<Config, Links, Props, Style, States, Values, Functions, Stores>
    ) => void
  }

export type ArchitectComponent<Props extends ArchitectComponentProps = {}> = React.ComponentType<Props>
