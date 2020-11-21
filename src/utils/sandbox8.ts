type StoreValues = { [name: string]: any }

type StoreBindValues<Values extends StoreValues> = (keyof Values)[]

interface StoreActions<Values extends StoreValues> {
  get: { [name in keyof Values]: () => Values[name] }
  set: { [name in keyof Values]: (d: Values[name]) => void }
}

type StoreBind<
  Id extends string = any,
  Values extends StoreValues = any,
  Bindings extends StoreBindValues<Values> = any
  > = {
    id: Id
    //bindings: Bindings
    /*get: { [value in (Bindings extends (infer J)[] ? J : never)]: Values[value] }
    set: { [value in (Bindings extends (infer J)[] ? J : never)]: (data: Values[value]) => void }*/
    bind: {
      get: { [value in Bindings extends (infer J)[] ? J : never]: Values[value] }
      set: {
        [value in Bindings extends (infer J)[] ? J : never]: (
          data: Values[value],
        ) => void
      }
    }
  }

function newStore<Id extends string>(id: Id) {
  return <Values extends StoreValues>(values: Values) => {
    const actions: StoreActions<Values> = { get: {} as any, set: {} as any }
    return {
      ...actions,
      bind: <Bindings extends StoreBindValues<Values>>(
        ...bindings: Bindings
      ): StoreBind<Id, Values, Bindings> => ({} as any),
    }
  }
}

/// --------------------------------------------------------------------------

//type ImportType<Id extends string = any, Values extends StoreValues = any, Bindings extends StoreBindValues<Values> = any> = StoreBind<Id, Values, Bindings>[]

type Test<
  Values extends StoreValues = any,
  Bindings extends StoreBindValues<Values> = any
  > = Bindings extends (infer J)[] ? J : never

/*type ExtractStores<Stores extends ImportType> = Stores extends ImportType<infer Bind> ? {
    [store in Bind["id"]]: Bind["bindings"] //{ get: Bind["get"], set: Bind["set"] }
} : never*/

/*function importStore<Stores extends ImportType>(...s: Stores) {
  return ({} as any) as Stores extends ImportType<infer Id, infer Values, infer Bindings> ? {
        [store in Id]: { test: Bindings }
    } : never
}*/

type ImportType<
  Id extends string = any,
  Values extends StoreValues = any,
  Bindings extends StoreBindValues<Values> = any
  > = StoreBind<Id, Values, Bindings>[]

function importStore<Stores extends ImportType>(...s: Stores) {
  return ({} as any) as {
    [name in Stores extends ImportType<infer Id>
    ? Id
    : never]: Stores extends ImportType<infer I, infer V, infer S> ? S : never
  }
}

/// --------------------------------------------------------------------------

const store1 = newStore("test1")<{ a: string; b: string }>({ a: "", b: "" })
const store2 = newStore("test2")<{ a2: string; b2: string }>({ a2: "", b2: "" })

const test2 = importStore(store1.bind("a", "b"), store2.bind("b2"))

/*type input<content extends { id: number, value: string } = { id: number, value: string }> = content[]
const convert = <I extends input>(...i: I): I extends input<infer C> ? { [id in C["id"]]: C["value"] } : never => ({} as any)
const result = convert({ id: 1, value: "a" } as const, { id: 2, value: "b" } as const)*/

/*type input<id extends number = any, value extends string = string> = { id: id, value: value }[]
const convert = <I extends input>(...i: I): I extends input<infer Id, infer Value> ? { [id in Id]: Value } : never => ({} as any)
const result = convert({ id: 1, value: "a" } as const, { id: 2, value: "b" } as const)*/

/*type input<i extends number = any, id extends number = any, value extends string = string> = { [index in i]: { id: id, value: value } }
const convert = <I extends input>(i: I): I extends input<infer Id, infer Value> ? { [id in Id]: Value } : never => ({} as any)
const result = convert([ { id: 1, value: "a" }, { id: 2, value: "b" } as const ])*/
