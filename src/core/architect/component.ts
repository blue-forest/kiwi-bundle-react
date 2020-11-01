import { StyleSheetMediaQuery, StyleSheetStyle } from "../styles"

export enum ArchitectComponentType {
  COMPONENT,
  LAYOUT,
  PAGE,
}

export type ArchitectComponentProps = { [name: string]: any }

export type ArchitectComponentStates = { [name: string]: any }

export type ArchitectComponentValues = { [name: string]: any }

export type ArchitectComponentStores = { [name: string]: any }

export type ArchitectComponentFunctions = { [name: string]: () => void }

export type ArchitectComponentStyle = {
  [name: string]: StyleSheetStyle | StyleSheetMediaQuery[]
}

export type ArchitectComponent<Props extends ArchitectComponentProps = {}> = React.ComponentType<Props>
