import { observable, action } from "mobx"

export class Store {
  name: number

  constructor(name: number) {
    this.name = name
  }

  @observable items: string[] = []
  @observable currentItem: string = ""

  @action
  changeCurrentItem(value: string) {
    this.currentItem = value
  }

  @action
  addCurrentItem() {
    this.items.push(this.currentItem)
    this.currentItem = ""
  }

  @action
  reset() {
    this.items = []
    this.currentItem = ""
  }
}
