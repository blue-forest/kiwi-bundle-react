import { StackHeaderLeftButtonProps } from "@react-navigation/stack"

export type CustomHeaderLeft = (props: StackHeaderLeftButtonProps) => React.ReactNode

export type CustomHeaderRight = (props: { tintColor?: string | undefined }) => React.ReactNode
