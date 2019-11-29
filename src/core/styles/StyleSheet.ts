import { CSSProperties } from "react"

type StyleSheetMediaQuery = {
  minWidth?: number
  maxWidth?: number
  style: CSSProperties
}

export type StyleSheet = CSSProperties | StyleSheetMediaQuery[]

type StyleSheetObject<Data> = {
  [index in keyof Data]: StyleSheet | ((...params: any[]) => StyleSheet)
}

export const StyleSheet = <Data extends StyleSheetObject<Data>>(data: Data): Data => data
