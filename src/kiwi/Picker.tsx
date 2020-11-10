import { React, ReactNative } from "../vendors"
import { Picker as PickerBase } from "@react-native-community/picker"
import { StyleSheetStyleView } from "../core/app/styles"

interface Props extends ReactNative.PickerProps {
  style?: StyleSheetStyleView
}

export const Picker = (props: Props) => {
  return <PickerBase {...props}/>
}
