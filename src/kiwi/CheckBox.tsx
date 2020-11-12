import { React } from "../vendors"
import CheckBoxBase, { CheckBoxProps } from "@react-native-community/checkbox"
import { StyleSheetStyleView } from "../core/app/styles"

interface Props extends CheckBoxProps {
  style?: StyleSheetStyleView
}

export const CheckBox = (props: Props) => {
  return <CheckBoxBase {...props} />
}
