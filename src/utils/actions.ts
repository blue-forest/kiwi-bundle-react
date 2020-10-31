
export type Actions<Data> = {
  target: {
    get: () => Data | undefined
    set: (data: Data) => void
  }
  bind: (callbacks: { get?: () => Data, set?: (data: Data) => void }) => void
}

export const Actions = <Data>(defaultValue?: Data): Actions<Data> => {
  let get: () => Data
  let set: ((data: Data) => void)[] = []
  if (typeof defaultValue !== "undefined") {
    get = () => defaultValue
  }
  return {
    bind: cb => {
      if (typeof cb.get !== "undefined") get = cb.get
      if (typeof cb.set !== "undefined") set.push(cb.set)
    },
    target: {
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
