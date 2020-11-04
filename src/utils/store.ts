
export type Store<Data> = {
  data: {
    get: () => Data | undefined
    set: (data: Data) => void
  }
  bind: (callbacks: { get?: () => Data, set?: (data: Data) => void }) => void
}

export const Store = <Data>(data?: Data): Store<Data> => {
  let get: () => Data
  let set: ((data: Data) => void)[] = []
  if (typeof data !== "undefined") {
    get = () => data
  }
  return {
    bind: cb => {
      if (typeof cb.get !== "undefined") get = cb.get
      if (typeof cb.set !== "undefined") set.push(cb.set)
    },
    data: {
      get: () => {
        if (typeof get === "undefined") return
        return get()
      },
      set: data => {
        set.forEach(cb => cb(data))
      },
    },
  }
}
