class FruitStand {
  constructor(fruitNames: string[]) {}
}

// This is a type that takes a GENERIC: C for class. We want the TYPE of the CLASS.
type ConstructorArg<C> = C extends {
  new (arg: infer A): any
}
  ? A
  : never
