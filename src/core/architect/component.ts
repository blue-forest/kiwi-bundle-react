import { AppConfig } from "../app/config"
import { AppLinksImports } from "../app/links"
import { StyleSheetMediaQuery, StyleSheetStyle } from "../app/styles"

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

export type ArchitectComponentStores<Config extends AppConfig, Links extends AppLinksImports<Config>> = {
  [name in keyof Links["stores"]]?: Stores[name]
}

export type ArchitectComponent<Props extends ArchitectComponentProps = {}> = React.ComponentType<Props>
