import { React, ReactNative } from "../vendors"
import { StyleSheetStyleView } from "../core/app/styles"

interface Props extends ReactNative.ModalProps {
  style?: StyleSheetStyleView
}

export const Modal = (props: Props) => {
  return <ReactNative.Modal {...props}/>
}
