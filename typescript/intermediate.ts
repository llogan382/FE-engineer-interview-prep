class Fruit {
  name?: string
  mass?: number
  color?: string
  static createBanana(): Fruit {
    return { name: "banana", color: "yellow", mass: 183 }
  }
}

const valueTest = Fruit;

const typeTest: Fruit = {} as any;


type DatePropertyNames = keyof Date

// Get every KEY that can be of type STRING:
type DateStringPropertyNames = DatePropertyNames & string

type DateSymbolPropertyNames = DatePropertyNames & symbol


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

let carColor: Car["trans"]
let carColorRedComponent: Car["color"]["red"]


type Fruit = {
  name: string
  color: string
  mass: number
}


type Dict<T> = { [k: string]: T } // <- index signature

const fruitCatalog: Dict<Fruit> = {}

// mapped type
// Build up an objest with a set of known keys with a consistent map type.
type MyRecord<KeyType extends string, ValueType> = {
  [Key in KeyType]: ValueType
}


// Indexed Access Types

// type PartOfWindow = {
//     [Key in
//       | "document"
//       | "navigator"
//       | "setTimeout"]: Window[Key]
//   }



type PickProperties<
  ValueType,
  Keys extends keyof ValueType
> = {
  [Key in Keys]: ValueType[Key]
}
type PartOfWindow = PickProperties<
  Window,
  "document" | "navigator" | "setTimeout"
>

type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

type PickProperties<
  ValueType,
  Keys extends keyof ValueType
> = {
  [Key in Keys]: ValueType[Key]
}


type ArtFeatures = "cabin" | "tree" | "sunset"
type Colors =
  | "darkSienna"
  | "sapGreen"
  | "titaniumWhite"
  | "prussianBlue";

  // type ArtMethodNames = `paint_${Colors}_${ArtFeatures}`

  type ArtMethodNames =
  `paint${Capitalize<Colors>}${Capitalize<ArtFeatures>}`



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
