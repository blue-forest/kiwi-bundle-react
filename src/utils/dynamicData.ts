export type DynamicData<Data> = {
  data: {
    get: () => Data | undefined
    set: (data: Data) => void
  }
  onUpdate: (cb: () => void) => void
  bind: (callbacks: { get?: () => Data; set?: (data: Data) => void }) => void
}

export const DynamicData = <Data>(initialValue: Data): DynamicData<Data> => {
  let get: () => Data = () => initialValue
  let set: ((data: Data) => void)[] = []
  let onUpdate: (() => void)[] = []
  return {
    bind: (cb) => {
      if (typeof cb.get !== "undefined") {
        get = cb.get
      }
      if (typeof cb.set !== "undefined") {
        set.push(cb.set)
      }
    },
    onUpdate: (cb: () => void) => {
      onUpdate.push(cb)
    },
    data: {
      get: () => get(),
      set: (newData) => {
        set.forEach((cb) => cb(newData))
        onUpdate.forEach((cb) => cb())
      },
    },
  }
}
