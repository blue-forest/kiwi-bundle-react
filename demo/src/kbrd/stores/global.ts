import { KBRD } from ".."

type Data = {
  counter: number
}

export default KBRD.Store<Data>({
  counter: 0,
})
