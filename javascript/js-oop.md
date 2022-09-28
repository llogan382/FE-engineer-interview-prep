# What is OOP in JS?

In JS, everything is an object. OOP refers to putting functions in an object, and accessting them with the built-in feature called **PROTOTYPE**. This is automatic and appears in every JS object. You can access it in the browser tools by typing `myObject.` and it will auto-fill with some of the default options:
```js
__defineGetter__
__defineSetter__
__lookupGetter__
__lookupSetter__
__proto__
constructor
hasOwnProperty
isPrototypeOf
propertyIsEnumerable
toLocaleString
toString
toValueOf
```

What are these properties and where do they come from?
Each object has a `prototype`, and the `prototype` itself is an object, and has its own `prototype`. This is called the prototype chain, and it ends when a prototype has `null` for its own prototype.

# __proto__

The word `prototype` isnt standard though- but the word `__proto__` is.


# What if our code was all bundled together?

It is a way to structure complex code.

- easy to add features and functionality
- easy for us and other developers to figure out the structure
- efficient use of memory.

Organize code as it gets more complext so it is not a series of commands.

How do we combine data with functions?
ANSWER: combine in an object.

There are tons of options that we can add to a USER - like logged in, is active, address, etc.

First option: Create an object.

## Create objects using a function.

LOCAL MEMORY- only data is available within this function.
the NAME is the ARGUMENT, the SCORE is the PROPERTY.
After everything is created, it is returned to the GLOBAL MEMORY as `const user1`.

This works, but each function is duplicated on every user. JS does not have OOP in its nature. We only want 1 function (not a copy of the function on every user.)


## How to NOT use functions on every user.

Store the functions on a SINGLE object: Using the PROTOTYPE CHAIN.

Goal: Can we BUNDLE the functionality WITH the DATA we want to use for it?

how does the keyword NEW work under the hood?

PROTOTYPE CHAIN- it uses the PROTOTYPAL NATURE. When JS does not find the method, it looks on the __PROTO__ method, which is a LINK to the FUNCTION that calls it.

SO, there is a BOND, and there are some magic keywords that link these functions.

so JS creates a way to LINK, or create a BOND between an object and all of its functionality.

AS soon as you create a function in JS, all parts and methods of an OBJECT are also available.

So, you can use OBJECT properties (the DOT notation).
## How to NOT use functions on every user.

Store the functions on a SINGLE object: Using the PROTOTYPE CHAIN.

Goal: Can we BUNDLE the functionality WITH the DATA we want to use for it?

how does the keyword NEW work under the hood?

PROTOTYPE CHAIN- it uses the PROTOTYPAL NATURE. When JS does not find the method, it looks on the __PROTO__ method, which is a LINK to the FUNCTION that calls it.

SO, there is a BOND, and there are some magic keywords that link these functions.

so JS creates a way to LINK, or create a BOND between an object and all of its functionality.

AS soon as you create a function in JS, all parts and methods of an OBJECT are also available.

So, you can use OBJECT properties (the DOT notation).


## The NEW keyword

How can we refer to the object that was created automatically?

So, once the OBJECT is creted, where do we put the single functions that are associated with it?

FUNCTIONS ARE BOTH OBJECT AND FUNCTIONS

take this code:

```js
function userCreator (name, score) {
const newUser = Object.create(userFunctionStore); //A function is created, and linked to this other function, but how is it bonded, how is it connected to userFunctionStore?
newUser.name = name;
newUser.score = score;
return newUser;
};
const userFunctionStore = {
increment: function(){this.score++;},
login: function(){console.log("You're loggedin");}
};
const user1 = userCreator("Phil", 4);
const user2 = userCreator("Julia", 5);
user1.increment(); //Since increment is not on the user1 object, it looks up the prototype chain, and finds increment on the userfunctionstore object.
```

Every object has built in `__proto__` methods, which is an object/function combo that links to ALL METHODS stored on this object. In the code above, `userFunctionStore` is being used to represent the external connection.


# New

The New keyword is essentially a way of running a new function again, and passing in the variables.

Everything that it has access to is THE PROTOTYPE

the word NEW creates a bunch of automation to the function.

the `new` keyword creates a word `this` as an empty object.
It adds the word __proto,

The `new` keyword also links to the `proto` object
AND
`new` automatically returns the object.

## CLASSES

they are faster to write, and standards in professional engineering.

99% of engineers dont know how they work.
They need an upper case letter to work.

Functions are stored as objects on the PROTO chain.

CLASSES puts the right data with the right functions that apply to that functionality.

What if there is a shared inner function?

So we need to add a function that can work on each of the objects.
So, when the function is called, it only applies to the right object.
`this` points to the object to the left of the dot.

## Implicit argument

If nothing is passed in, the keyword "this" refers to the object to the left of the dot.


# Class keyword

Usercreator.prototype.function()
becomes
function()

The `class` keyword takes any functions, and attaches them to the object by themselves.
JS is syntactical sugar- under the hood, it is just putthing the function into the prototype object.

So instead of a function/object combo (like before), we call it a class

When it comes to sub classing, it does change things.

CLass comprises of a function and an object.

so:
1. Create the function
2. Add all methods that apply to that function.


the `Class` keyword adds all methods automatically.

When JS loads, there is a function/object combo.

If JS doesnt find something in the prototype, it looks up the chain.

Objects INHERIT functionality.
What if PAID USERS want certain functions that are only available to certain functions?

## A core aspect is INHERITANCE.

Like, if there are users, there may be paid users, moderators, admin, etc.
How can we use everything from USERS and not have to repeat it, BUT add more features?

INHERITANCE isnt automatic- it is the RIGHT TO LOOK UP the prototype chain.

OOP is just a way of re-writing more specific versions of the actions that are wanted.


## The CLASS keyword

When creating a function within a class, JS automatically adds all functions using the `constructor` method. It makes all functions available within the class.
You could use it without the `class` keyword using something like:

```js
Usercreator.prototype.increment = function(){
  this.score++
}

user1.increment;
```
You would get the same functionality there as you would with using the class keyword, like this:
```js
class Usercreator {
  constructor(score){
    this.score = score;
  }
  increment = this.score++
}
user1.increment;
```
the `constructor` word is the only difference.


## __proto__

JS uses the `__proto__` link to give objects, functions, and arrays a bunch of extra functionality.

```js
const obj = {  ///this will be stored in global memory.
num : 3
}
obj.num // 3
obj.hasOwnProperty("num") // ? Where's this method? First, the JS engine will look on "obj". It is a function/object combo. All
Object.prototype // {hasOwnProperty: FUNCTION}
```

All function/object combos has an object on it with a property called `hasOwnProperty`. This is what our `__proto__` points to.
Every object has a `__proto__` which goes up the chain to the next object, to see if it has th property.


**Arrays and functions** are also object, so they get access to everything in `Object.prototype` plus a few more.

```js
function multiplyBy2(num){
return num*2
}
multiplyBy2.toString() //Where is this method?
Function.prototype // {toString : FUNCTION, call : FUNCTION, bind : FUNCTION}
multiplyBy2.hasOwnProperty("score") // Where's this function?
Function.prototype.__proto__ // Object.prototype {hasOwnProperty: FUNCTION}
```

the line, `Function.prototype` is built in to JS, and is a Function/Object combo.


# New keyword, and share functions is PROTOTYPE

```js
function UserCreator(name, score){ //this is created in global memory.
this.name = name;
this.score = score;
}
UserCreator.prototype.increment = function(){ //this puts the function on the object UserCreator.
this.score++;
};
UserCreator.prototype.login = function(){
console.log("login");
};
const user1 = new UserCreator(“Eva”, 9) // this is an unevaluated function. It creates an object, and mutates the execution context.
user1.increment()
```

All we want to do is run `userCreator` and return an object.

ABOVE: We have a function that takes two arguments, name and score. We want to attach functions to it. So, the word `new` will create a new OBJECT, and we attach functions to that object using the `prototype` property.

the word NEW creates a new EXECUTION CONTEXT and does these three things:

1. Create an empty object and assign to `this`
2. It puts in the `__proto__` property, which is a link to the `this` object's PROTOTYPE, which has the functions.
3. It automatically returns the function

> the uppercase letter for the function name tells people that they need to use the word NEW for the function to work.


# Subclassing.

It is like creating a more specified version of an object. It has all of the functions and properties.

# Factory Function approach

This is a way to create subclasses, and expands the code snippet from above:

