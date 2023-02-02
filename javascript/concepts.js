const person = {
  firstName: "steve",
  lastName: "allen",
  userName: 'steve@email.com',
  age: 42,
  email: "steve@elleb.com"
}


const userProxy = new Proxy(person, {
  get: (target, property) => {
    console.log(`${new Date()} | The value of ${property} is ${Reflect.get(target, property)}`)
  },
  set: (target, property, value) => {
    if(property === 'userName'){
      if(typeof property.userName!= String){
        console.log('userName muse be a string')
      }
    }
    return Reflect.set(target, property, value)
  }
})

userProxy.userName = 49;

userProxy.age
