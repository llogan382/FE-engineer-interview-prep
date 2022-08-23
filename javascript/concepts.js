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
//  setTimeout(function () {
//   console.log('Hello world!');
// }, 1000);

function unary(fn){
  return function one(arg){
    return fn(arg);
  };
}

function binary(fn){
  return function two(arg1, arg2){
    return fn(arg1, arg2);
  }
}
function f(...args){
  return args;
}

var g = unary(f);

console.log(g(1,2,3,4));

// What is the difference?

const val1 = anyFunc();

const val2 = anyFunc;

function multiplyBy2(num){
  return num*2
  }
  multiplyBy2.toString() //Where is this method?
  Function.prototype // {toString : FUNCTION, call : FUNCTION, bind : FUNCTION}
  multiplyBy2.hasOwnProperty("score") // Where's this function?
  Function.prototype.__proto__ // Object.prototype {hasOwnProperty: FUNCTION}

