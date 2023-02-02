- [Declarations merging](#declarations-merging)
- [Namespace](#namespace)
  - [Classes](#classes)
  - [Modules](#modules)
  - [Webpack, parcel](#webpack-parcel)
  - [Type Queries](#type-queries)
  - [TypeOf](#typeof)
  - [Conditional Types](#conditional-types)
  - [Extract and Exclude](#extract-and-exclude)
  - [Inference with Conditional Types](#inference-with-conditional-types)
- [Indexed Access Types](#indexed-access-types)
- [Mapped Types](#mapped-types)
- [Use with Indexed Access Types](#use-with-indexed-access-types)
- [Picking and Mapping Modifiers](#picking-and-mapping-modifiers)
- [Template Literal Types](#template-literal-types)
  - [Filtering properties.](#filtering-properties)



# Declarations merging

A TYPE and a variable can have the same name. For example:

```tsx
    interface Fruit {
      name: string
      mass: number
      color: string
    }

    const banana: Fruit = {
      name: "banana",
      color: "yellow",
      mass: 183,
    }
```

Both the Interface and the Type have the same name.

If importing, how can you tell if its a type, a value, or a namespace?

If the `=` is on the left of the value *with no error* then it is a value.

If the `=` is on the right hand side, it is a type:
`const y: is_a_type = {}`

# Namespace

What is a namespace? What is the point?
It can be stacked when there are 2 equivalent types that need to outline a function. They were very helpful for backwards compatible like jQuery, and are not recommended for modern JS.

## Classes

They have both a value and a type associated with them, by default.

## Modules

Before 2015, there was no standard module spec.
You should only use ESModules now.
Everything in JS also works for TS:

```tsx
    // named imports
    import { strawberry, raspberry } from "./berries"
    import kiwi from "./kiwi" // default import
    export function makeFruitSalad() {} // named export
    export default class FruitBasket {} // default export
    export { lemon, lime } from "./citrus"
```

## Webpack, parcel

How does this work w JS?
JS modules might work with non-js items.
Here is an example:
`import img from "./file.png"`

file.png is obviously not a TypeScript file — we just need to tell TypeScript that whenever we import a .png file, it should be treated as if it’s a JS module with a string value as its default export

This can be fixed with a module declaration like this:

```tsx
    // @filename: global.d.ts
    declare module "*.png" {
      const imgUrl: string
      export default imgUrl
    }
    // @filename: component.ts
    import img from "./file.png"
```

## Type Queries

`keyOf` allows us to obtain *KEYS* of an interface object.
We can use INTERSECTIONS to pick all items that meet 2 criteria: It is a key AND a string (for example)

## TypeOf

This is a direct type query- when you have a value, and you need a type that describes that value.

What if you are importing an API response?
It can take the whole API response, **even if the shape changes**, and the `typeOf` shape, or type, will be updated automatically.

```tsx
    async function main() {
      const apiResponse = await Promise.all([
        fetch("https://example.com"),
        Promise.resolve("Titanium White"),
      ])

      type ApiResponseType = typeof apiResponse
    }
```

## Conditional Types

Like a ternerary operator, but for types.

```tsx
    const x = 16
    const isXNegative = x >= 0 ? "no" : "yes"
```

The same thing is being used here, with the ternerary operator syntax. If it is `Grill`, if not, it is `Oven`.
Current TS uses the keyword **extends** to express equivalence, or compare items/values.

```tsx
    class Grill {
      startGas() {}
      stopGas() {}
    }
    class Oven {
      setTemperature(degrees: number) {}
    }

    type CookingDevice<T> = T extends "grill" ? Grill : Oven

    let device1: CookingDevice<"grill">

    let device2: CookingDevice<"oven">
```

## Extract and Exclude

These can get you what you want based on what you like, or dont liek.
Lets look at colors. They can be expressed in many ways in CSS. Here, we have a type:
It can be a string, or an array of three numbers, or an RGB value (an object. )

```tsx
    // a set of four specific things
    type FavoriteColors =
      | "dark sienna"
      | "van dyke brown"
      | [number, number, number]
      | { red: number; green: number; blue: number }

    type StringColors = Extract<FavoriteColors, string>

    type NonStringColors = Exclude<FavoriteColors, string>

    type ObjectColors = Extract<FavoriteColors, { red: number }>
```

If you want the type with just strings, you can use the type above.

## Inference with Conditional Types

If you need a sub-part of a type, from another type. What does it do? Lets look at an example of a type that doesnt use it.

If we want something that will create a type for the first argument in a class.
We want to INFER the first argument in a class.
Essentially, you are creating a ternerary.

# Indexed Access Types

Grab a type from something LIKE a property key.

```tsx
    interface Car {
      make: string
      model: string
      year: number
      color: {
        red: string
        green: string
        blue: string
      }
    }

    let carColor: Car["color"] //This must be a string

```

# Mapped Types

The most powerful tool for transforming types.

It is like looping.

```tsx
    type Fruit = {
      name: string
      color: string
      mass: number
    }

    type Dict<T> = { [k: string]: T } // <- index signature

    const fruitCatalog: Dict<Fruit> = {}
    fruitCatalog.apple
```

What if we have a narrow set for KEY?

Mapped types define, index signatures are for arbitrary key value relationships.

the `in` keyword for mapped types;
index signatures can be on all `string` or `number`, but a SUBSET (or defined set).

There is an Object, of type `Fruit`, and the key is a string, and what is returned in `Dict` is the same thing that is passed in, in our case, the type `Fruit`.

What if we want something more specific than ANY STRING AT ALL?

We have a set description of strings we want to us. We will call it `myRecord`

# Use with Indexed Access Types

What if we only want to access certain parts of the global "window" object?

the TYPE, PickWindowProperties, is an OBJECT.
The VALUES in that object can only be items in the universal window object.

```tsx
  type PickWindowProperties<Keys extends keyof Window> = {
    [Key in Keys]: Window[Key]
  }
  type PartOfWindow = PickWindowProperties<
    "document" | "navigator" | "setTimeout"
  >

```

The type `PartOfWindow`, can only have PARTS of the window object.

Mapped types extend from dictionaries; where dictionaries return ALL values, mapped types can narrow them down.

Mapped types are good for the PROMISE API.

# Picking and Mapping Modifiers

For Records, we need the exact map type.
As we loop over mapped types, we can specify if it is `readonly` and/or `optional`.

`Partial`, with the `?`, tells you the value may or may not be there.

```tsx
    /**
     * Make all properties in T optional
     */
    type Partial<T> = {
      [P in keyof T]?: T[P]
    }
    /**
     * Make all properties in T required
     */
    type Required<T> = {
      [P in keyof T]-?: T[P]
    }
    /**
     * Make all properties in T readonly
     */
    type Readonly<T> = {
      readonly [P in keyof T]: T[P]
    }
```

# Template Literal Types

This is new in TS, version 4.3
Here is a type:

```tsx
type ArtFeatures = "cabin" | "tree" | "sunset"
type Colors =
  | "darkSienna"
  | "sapGreen"
  | "titaniumWhite"
  | "prussianBlue"

```

We can create a template literal type.

``
    type ArtMethodNames = `paint_${Colors}_${ArtFeatures}`
``

This can be used for MAPPING, if we need to manipulate the KEYS.

If I am iterating over each key, and setting a piece of data.

Iterate over everything, and Set the capital letter for the first item:

```tsx
    interface DataState {
      digits: number[]
      names: string[]
      flags: Record<"darkMode" | "mobile", boolean>
    }

    type DataSDK = {
      // The mapped type
      [K in keyof DataState as `set${Capitalize<K>}`]:
        (arg: DataState[K]) => void
    }

    function load(dataSDK: DataSDK) {
      dataSDK.setDigits([14])
      dataSDK.setFlags({ darkMode: true, mobil: false })
    }
```


## Filtering properties.

What if we only want certain properties? This works if we only know the KEY.

``
    type DocKeys = Extract<keyof Document, `query${string}`>
    type KeyFilteredDoc = {
        [K in DocKeys]: Document[K]
    }
``

>A better approach, which will get us a much cleaner result is to filter our keys first and then use those keys to build a mapped type

This isnt code that RUNS, it is just a way to narrow what you are looking for.


```tsx
        // Get keys of type T whose values are assignable to type U
        type FilteredKeys<T, U> = {
        [P in keyof T]: T[P] extends U ? P : never
        }[keyof T] &
        keyof T

        type RelevantDocumentKeys = FilteredKeys<
        Document,
        (...args: any[]) => Element | Element[]
        >

        type ValueFilteredDoc = Pick<Document, RelevantDocumentKeys>

        function load(doc: ValueFilteredDoc) {
        doc.querySelector("input")
        }
```


The process is to start out BROAD, and reduce the results by narrowing the types that can be used.

