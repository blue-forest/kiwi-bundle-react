
export type Actions<Data> = {
  target: {
    get: () => Data
    set: (data: Data) => void
  }
  bind: (callbacks: { get: () => Data, set: (data: Data) => void }) => void
}

export const Actions = <Data>(defaultValue: Data): Actions<Data> => {
  let get = () => defaultValue
  let set: (data: Data) => void = () => { }
  return {
    target: {
      get: () => get(),
      set: data => set(data),
    },
    bind: cb => {
      get = cb.get
      set = cb.set
    },
  }
}
