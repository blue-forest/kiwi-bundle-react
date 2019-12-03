import { CSSProperties } from "react"
import { KeysObject } from "dropin-recipes"

type StyleSheetMediaQuery = {
  min?: number
  max?: number
  style: CSSProperties
}

export type StyleSheetData = CSSProperties | StyleSheetMediaQuery[]

export type StyleSheet<Data> = KeysObject<Data, StyleSheetData | ((...params: any[]) => StyleSheetData)>
