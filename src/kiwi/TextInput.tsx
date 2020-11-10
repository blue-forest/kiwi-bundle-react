import { React, ReactNative } from "../vendors"
import { StyleSheetStyleText } from "../core/app/styles"

interface Props extends ReactNative.TextInputProps {
  style?: ReactNative.StyleProp<StyleSheetStyleText>
  children?: React.ReactNode
}

export const TextInput = (props: Props) => {
  return <ReactNative.TextInput {...props}/>
}
