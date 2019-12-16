import { CSSProperties as ReactCSS } from "react"
import { KeysObject } from "dropin-recipes"

export type CSSProperties = ReactCSS

type StyleSheetMediaQuery = {
  min?: number
  max?: number
  style: CSSProperties
}

export type StyleSheet = CSSProperties | StyleSheetMediaQuery[]

export type StyleSheetData<Data> = KeysObject<Data, StyleSheet | ((...params: any[]) => StyleSheet)>

export const StyleSheet = <Data extends StyleSheetData<Data>>(data: Data): Data => data
