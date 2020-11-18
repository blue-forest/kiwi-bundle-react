import { StyleSheetStyle } from "../app/styles"

export enum ArchitectComponentType {
  COMPONENT,
  LAYOUT,
  PAGE,
}

export type ArchitectComponentProps = { [name: string]: any }

export type ArchitectComponentStyle = {
  [name: string]: StyleSheetStyle // | StyleSheetMediaQuery[]
}

export type ArchitectComponentStates = Required<{ [name: string]: any }>

export type ArchitectComponentStores = { [store: string]: string[] }

export type ArchitectComponentValues = { [name: string]: any }

export type ArchitectComponentFunctions = Required<{
  [name: string]: (...params: any) => any
}>

export type ArchitectComponent<
  Props extends ArchitectComponentProps = {}
  > = React.ComponentType<Props>
