import { KBRD } from ".."

type Data = {
  current: number
}

export const CounterStore = KBRD.Store<Data>({
  current: 0,
})
