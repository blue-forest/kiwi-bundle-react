import { KeysObject } from "dropin-recipes"

export interface Theme<Data extends Theme = any> {
  sizes: KeysObject<Data["sizes"], number>
  colors: KeysObject<Data["colors"], string>
}

export const Theme = <T extends Theme<T>>(theme: T): T => theme
