import { React, ReactNative } from "../vendors"
import { Picker as PickerBase } from "@react-native-community/picker"
import { StyleSheetStyleView } from "../core/app/styles"

interface Props extends ReactNative.PickerProps {
  style?: StyleSheetStyleView
  children?: React.ReactNode
}

export const Picker = (props: Props) => {
  return <PickerBase {...props} />
}
