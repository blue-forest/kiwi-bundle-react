import { KBRD } from ".."

type Data = {
  counter: number
}

export const GlobalStore = KBRD.Store<Data>({
  counter: 0,
})
