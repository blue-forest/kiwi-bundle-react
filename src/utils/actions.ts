
export type Actions<Data> = {
  target: {
    get: () => Data | undefined
    set: (data: Data) => void
  }
  bind: (callbacks: { get?: () => Data, set?: (data: Data) => void }) => void
}

export const Actions = <Data>(defaultValue?: Data): Actions<Data> => {
  let get: () => Data
  let set: (data: Data) => void = () => { }
  if (typeof defaultValue !== "undefined") {
    get = () => defaultValue
  }
  return {
    target: {
      get: () => {
        if (typeof get === "undefined") return
        return get()
      },
      set: data => {
        if (typeof set !== "undefined") set(data)
      },
    },
    bind: cb => {
      if (typeof cb.get !== "undefined") get = cb.get
      if (typeof cb.set !== "undefined") set = cb.set
    },
  }
}
