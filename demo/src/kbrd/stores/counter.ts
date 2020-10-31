import { KBRD } from ".."

type Data = {
  current: number
}

export default KBRD.Store<Data>({
  current: 0,
})
