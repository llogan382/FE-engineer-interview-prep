
# Notes from the course taught by Will Sentance, titled Javascript: The new hard parts.

## Javascript: The New Hard Parts

JS is single threaded, meaning you can only run one line at a time.

**Asyncronicity** is the backbone of modern web development in Javascript.

In Javascript, a new model had to be introduced to get around this single threaded approach. The BROWSER is a wealth of Javascript features. There are interfaces that interact with things outside of Javascript.

A task needs to be defined, and then Javsascript will run a separate piece of code, and then come back.


```js
function display(data){
  console.log(data)
}
const dataFromApi = fetchAndWait('https://twitter.com/will/tweet1')
// User can do NOTHING here, while waiting data to return.

display(dataFromApi)

console.log("Me Later");
```
It is easy to read the code above, and understand what is happening, but it is untenable- the Javsascript Code Execution stops cold until there is a response.

## Web Browser Features

THere are plenty of browser APIs that can make this solution of going out into the internet and retrieving data, easier.

Background threads run as well:

```js
function printHello(){
  console.log("hello");
}

setTimeout(printHello, 1000); //this runs after 1000 ms, part of BROWSER API.

console.log("Me First"); //This will run first, because the JS engine is paused above for 1000 ms.
```

Above, none of this is in the Javascript language- Javascript has no timer. Timers run in the web browser APIs.

So when does the inline JS functionality continue? What are the RULES for when JS runs while interacting with the outside world?

## Callback Queue

Items in the callback queue run after everything in the global scope has run.


## What is the difference between a senior level, and a mid-level?

Senior level has the technical communication to empower a team, and mid-level engineers can build anything, *even if they havent seen it before*.


## Promises

What are they?
- special objects built into JS that get returned immediately when we make a call to a web-browser API/feature.
- Promises act as a placeholder for the data we hope to get back from the web browser feature's background work.
- We attach the functionality we want to defer running until that background work is done.
- Promise objects will automatically trigger functionality to run.

Example:

```js
function display(data){
  console.log(data)
}

const futureData = fetch('https://twitter.com/will/tweet1')

futureData.then(display); //Future data, when it is fulfilled, runs the display function. It will not run now, so the next line of code can continue to run.

console.log("Me First!")
```


## Background Browser work: Fetch

`fetch` defaults to using a `GET` command. This is spun up in the background in the browser. Immediately, it creates a PROMISE object with a value of the returned api call and an array of functions called **onFulFillment** to be performed when the data returns.

## How do deferred functions get back to the Javascript queue?

```js
function display(data){console.log(data)}
function printHello(){console.log("hello")}
function blocksFor300Ms(){loop the blocks js for 300 ms}

setTimeout(printHello, 0) //0 ms will pass before the function is allowed to run in JS. It is added to the callback queue.
const futureData = fetch('https://twitter.com/will/tweet1')
futureData.then(display)
blockFor300Ms()
console.log("Me first")
```

Which line from above will run first?
We know that Javascript will run everything in the event loop first, then it will run items in the callback queue.

|Event Loop |Browser callback queue  |
--- | --- |
| `meFirst()` |printHello()|
|  |futureData()|

for the part `const futureData = `, you are not **storing a function**, you are storing the returned value from the function.
**Fetch** triggers the browser's `xhr`, or `xml http request`.
the function `meFirst()` will run first, because everything in the event loop will run before the items in the browser's callback queue ever gets run.
There is actually another queue called the `job queue` where deferred javascript functionality gets added. Above, the `setTimeout` function gets added to the callback queue, and will not run until everything in the

All items added to any of these queues run on *last in last out` order. From the code snippet above, the function `printHello` that was deferred by `setTimeout` for 0ms, will be the last function that will be called.

To sum: Javascript's **Call Stack** is comprised of the **job queue**, which is the Javascript engine stuff, and the **callback queue** which is the list of functionality on the browser's api- like fetch, timeout, etc.

## Iterators

Data is often not a single value- it is a collection of data. What if we could go through each element, and run a function on the next item in each element?

Here is the "old way" of doing it:

```js
const numbers = [4,5,6]

for (let i = 0; i < numbers.length; i++){
  console.log(numbers[i])
}
```

What if you could control the flow of the loop based on the value that it returns, rather than automatically looping through each item in the loop? There is a problem: Everytime a function is run in Javascript, the memory is erased, so there is no reference to it after that.

Solution? Functions inside other function.

```js
function createNewFunction(){
  function add2(num){
    return num + 2;
  }
  return add2; // when you hit the return, all memory for this function is garbage-collected
}

const newFunction = createNewFunction() //once this value is stored, JS never references createNewFunction again. JS is only interested in the add2 functionality within
const result = newFunction(3)
```

Question: What does this do?
`const newFunction = createNewFunction()`
A: It stores the value of the value returned from the function.

What if you remove the parenthesis from the same line, like this:
`const newFunction = createNewFunction`

A: It stores that function with a new name.

*What is happening in the code above?**
In Javascript, each line of code is parsed, and the line is stored in memory.

1. `createNewFunction` is stored in global memory.
2. `newFunction` calls the `createNewFunction` function.
   1. the function `add2` is stored in local memory for this function.
   2. the value for `add2` is returned
3. variable `const newFunction`  is stored in global memory
4. `result = newFunction()` is stored in global memory.
   1. inside the result is the value of `newFunction` running the `add2` functionality.


We need a way to create a function that holds the array, the position we are at in the array, and the ability to return to the next item in the array.

```js
 function createFunction(array){
  let i = 0;
  function inner(){
    const element = array[i]
    i++
    return element;
  }
  return inner;
 }

 const returnNextElement = createFunction([4,5,6]);
 ```

`createFunction` returns another function, `inner()`

Before a function is garbage-collected, all the surrounding data (or **state**), is brought over with the function into global memory. In this case, the array that is passed in, 4,5,6;
