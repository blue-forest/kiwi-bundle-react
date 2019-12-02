import { CSSProperties } from "react"
import { KeysObject } from "dropin-recipes"

type StyleSheetMediaQuery = {
  minWidth?: number
  maxWidth?: number
  style: CSSProperties
}

export type StyleSheet = CSSProperties | StyleSheetMediaQuery[]

type StyleSheetInput<Data> = KeysObject<Data, StyleSheet | ((...params: any[]) => StyleSheet)>

export const StyleSheet = <Data extends StyleSheetInput<Data>>(data: Data): Data => data
