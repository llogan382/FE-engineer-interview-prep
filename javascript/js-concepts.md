## Javascript Concepts Explained

Below is a list of concepts from Javascript explained a little more thoroughly.

### Closures (and lexical scoping)

Closures include the function and the lexical scope inside the outer function.

The `closure` function has access to all of the items, called **scope**, in the enclosing function,

An alternitive definition for **scope** is "Where do we look for things?"

All variables are either storing a variable, or retrieving the value of a variable. JS is always looking at variables, and applying the scope that it to.

JS is **compiled** or **parsed**.

When the JS is compiled (from textual code, to computerized-readable binary)
1. Lexing and tokenization
2. Parsing
3. Code generation.

If the Javascript is not compiled (or parsed)properly, it will not run: you will get an error.


```js
 setTimeout(function () {
  console.log('Hello world!');
}, 1000);
```
