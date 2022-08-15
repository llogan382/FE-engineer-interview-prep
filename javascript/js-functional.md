# Functional vs procedural programming


A function takes input, and returns output. (This is not a complete definition)

In JS, all functions return `undefined`.

`tuple` - an array of elements. They are more popular in other programming languages.

A FUNCTION is the relationship between the input and the output.
The Name of a function should describe the relationship between the input and the output.
Ask yourself, is it a function?

## Side effects.

What if a function doesnt have a return value?

```js
function shippingRate() {
  rate = ((size +1) * weight) + speed;
}
var rate;
var size = 12;
var weight = 4;
var speed = 5;
shippingRate();
rate; //57
```

Side effects are indirect inputs or indirect outputs. Functions should not access anything outside of itself. The function above is not a function because it has side effects.

If the above function were to be rewritten:

```js
function shippingRate(size, weight, speed){
  return ((size +1) * weight) + speed;
}

var rate;

rate = shippingRate(12, 4, 5) //57
```

The important part is not the function definition, but the function call.
The CALL of the function needs to avoid any side effects, if possible; not all side effects are avoidable.

Examples of side effects:
- I/O
- Database storage
- network calls
- DOM
- Timestamps
- Random Numbers.

Not all of these can be avoided. So when we say **avoid side effects**, what we really mean is to **minimize side effects**. Side effects should be super obvious. For example, if you are trying to debug something, there is a good chance that the "bug" can be found in the side effects elsewhere in the program.

### Pure Functions

It is a function that takes direct inputs, returns direct outputs, and has no side effects. You should always be able to PROVE this function- the exact same inputs should always return the exact same outputs.

To define that a function is pure, we need to see the entirety of the program. Once looking at the whole program, ask yourself, with `var` versus `const`, if using `var` in the outer scope, can something still be a pure function call?

```js
var z = 1;

function addTwo(x,y){
  return x + y;
}

function addAnother(x,y){
  return addTwo(x,y) + z;
}

addAnother(20,21); //42
```

Our responsibility as the author of the code is to make it obvious in your code that something will not change (like, const);
From above, how do you know if `z` gets re-assigned?

## Small Surface Area

The above function could be re-written like this:
```js
function addAnother(z){
  return function addTwo(x,y){
  return x + y + z;
  };
}

addAnother(1)(20, 21);
```
There are less lines where `z` can be re-defined, and this is STILL a pure function call.

## Same Input, same output.

If its not a function according to our definition, its a procedure. For the following, is this a function or a procedure?
```js
function getId(obj){
  return obj.id;
}
```

Yes, because it has the same input and same output.
What if the ID is a `Math.random` method?
Then NO. This is why it is important that we have access to all of the relevant parts of the program.

Going forward, the question to ask yourself isnt "is this pure or not?", the question to ask is "what degree of confidence do you have that this is a pure function based on the code that you see?". Because, there may be some chance of side effects from a function.

**Can Impuritys be extracted?** Possibly. A function can do the calculations, and a procedure can be called in isolation to minimize side effects.

Take this code snippet with impurities. Can they be extracted?
```js
function addComment(userId, comment){
  var record = {
    id: uniqueID(),
    userID,
    text: comment
  };
  var elem: buildCommentElement(record); //impurity
  commentList appendChild(elem); //working with DOM, impurity
}

addComment(42, "this is my first comment");
```

Yes, it can be re-written to take the DOM manipulation, and the `buildComment` parts out of the funciton, and what is left behind is a pure function.

**Another approach is to contain the impurity.**

Can we reduce the surface area of the impurity? Can the side effect pollute the global scope?  For example, what if you are using a function from an imported library, but dont want to modify a global `num` array?

You can wrap the impure function, and only modify the global array by making a copy within the function.

If you cant exrtact the function, or wrap it, or anything else, at least make it obvious to the reader (or, future you, or your teammates, etc. )
