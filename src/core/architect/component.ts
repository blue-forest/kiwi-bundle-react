import { StyleSheetMediaQuery, StyleSheetStyle } from "../app/styles"

export enum ArchitectComponentType {
  COMPONENT,
  LAYOUT,
  PAGE,
}

export type ArchitectComponentProps = { [name: string]: any }

export type ArchitectComponentStyle<Style extends ArchitectComponentStyle<Style>> = {
  [name in keyof Style]: StyleSheetStyle | StyleSheetMediaQuery[]
}

export type ArchitectComponentStates = Required<{ [name: string]: any }>

export type ArchitectComponentValues = { [name: string]: any }

export type ArchitectComponentFunctions = Required<{ [name: string]: (...params: any) => any }>

export type ArchitectComponent<Props extends ArchitectComponentProps = {}> = React.ComponentType<Props>
