import "react-native"
import React from "react"
import renderer from "react-test-renderer"
import { Test } from "./Test"

it("renders correctly", () => {
  renderer.create(<Test />)
})
