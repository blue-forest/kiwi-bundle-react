import { React, ReactNative } from "../vendors"
import { StyleSheetStyleView } from "../core/app/styles"

interface Props<Item> extends ReactNative.VirtualizedListProps<Item> {
  style?: StyleSheetStyleView
}

export function VirtualizedList<Item = any>(props: Props<Item>) {
  return <ReactNative.VirtualizedList {...props} />
}
