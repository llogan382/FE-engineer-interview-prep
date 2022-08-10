/**
 * This will throw errors if accessing global objects, including with the word "this"
 *
 * For Classes, constructors need to be bound with "new", and `this` is undefined, unless within scope of a class.
 */

"use-strict"


/**
 * Anonymous functions.
 *
 * As a callback that is used once and does not need to be used anywhere else. The code will seem more self-contained and readable when handlers are defined right inside the code calling them, rather than having to search elsewhere to find the function body.
 */
 setTimeout(function () {
  console.log('Hello world!');
}, 1000);

