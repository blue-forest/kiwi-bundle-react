
export type Values<Data, Type = string> = {
  [index in keyof Data]: Type | Values<Data[index], Type>
}
