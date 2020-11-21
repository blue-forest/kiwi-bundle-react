export type DynamicData<Data> = {
  data: {
    get: () => Data | undefined
    set: (data: Data) => void
  }
  bind: (callbacks: { get?: () => Data; set?: (data: Data) => void }) => void
}

export const DynamicData = <Data>(data: Data): DynamicData<Data> => {
  let get: () => Data = () => data
  let set: ((data: Data) => void)[] = []
  return {
    bind: (cb) => {
      if (typeof cb.get !== "undefined") {
        get = cb.get
      }
      if (typeof cb.set !== "undefined") {
        set.push(cb.set)
      }
    },
    data: {
      get,
      set: (newData) => {
        set.forEach((cb) => cb(newData))
      },
    },
  }
}
