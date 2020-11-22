export type ArrayFlattening<Type> = Type extends (infer Child)[] ? Child : never
