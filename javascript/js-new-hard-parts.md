- [Foundations of JS](#foundations-of-js)
  - [Asynchronicity.](#asynchronicity)
- [Asynchronous web browser APIS](#asynchronous-web-browser-apis)


# Foundations of JS

What happens when we runour code?

1. Run through code, line by line. This is the thread of execution. In order, top to bottom.
2. A place to store bits of data as we run our code. This can be called the variable environment.

The two of those together are the EXECUTION CONTEXT. This is the GLobAL EXECUTION CONTEXT. There is also a LOCAL EXECUTION CONTEXT in each function.

```js
const num = 1
function multiplyByTwo (inputNumber){
  const resultNumber = inputNumber*2
  return resultNumber;
}
const output = multiplyByTwo(4);

```

DECLARE A FUNCTION- creating a function, storing it in global memory.
What does a function create? A RETURN VALUE.
Everything gets garbage-cleaned after the function runs.
The `inputNumber` is known as a *PARAMETER*. The *ARGUMENT* is the value passed in.

Function *parameters* are the names listed in the function definition.
Function *arguments* are the real values passed to (and received by) the function.

When you return a value, it is available in the GLOBAL EXECUTION CONTEXT.

You cannot run to the next line until you finish the first line.
JS can only do 1 thing at a time.

JS is SINGLE THREADED and SYNCHRONOUS.

There are so many execution contexts being created, and deleted, all the time. It is hard to coneceptualize.
How does JS store all of this data, about what to execute when and where?
It is called a *STACK*, or a *CALL STACK*.

So, JS will start with the GLOBAL CONTEXT, then add each function to the CALL STACK. When the function is completed, it deletes each function, one by one, and moves to the next.

How do you add to the stack?

*PUSH* to add tot he stack, and *POP* to remove something from the stack.

## Asynchronicity.

It changes the whole SYNCHRONOUS method.
Sometimes tasks take a long time, and it is single-threaded. What to do?

Each function must complete its execution before continuing. What if a function runs to an external API call that takes 300ms? What if a user keeps clicking something before the function completes?

We need to DELAY the code for running bc we are waiting, but we dont want to block the singular thread. How do we do it?

*ASYNCHRONICITY* is how the internet works. These features are in the BROWSER.

```js
function display(data){
console.log(data)
}
const dataFromAPI = fetchAndWait('https://twitter.com/will/tweets/1')
//... user can do NOTHING here !
//... could be 300ms, could be half a second
// they're just clicking and getting nothing
display(dataFromAPI)
console.log(“Me later!”);
```

*What is happening above?*
1. Declare a function called DISPLAY.
2. the variable DATAFROMAPI will store the result of the function fetchAndWait.
3. JS is blocked from running until fetchAndWait is completed.
4. Call the `display` function with the `dataFromApi` value as a parameter.
5. Console.log the value.

When the slow task completes, it should run the next function.
But it is untenable

# Asynchronous web browser APIS

In node, they are called *background threads* but in JS, they are called BROWSER APIs.


```js
function printHello(){
console.log(“Hello”);
}
setTimeout(printHello,1000);
console.log(“Me first!”);
```

1. Define a function called `printHello` that takes no parameters.
2. call `setTimeout` with the printHello function, every 1000ms. There are no parens, meaning we are passing the whole function definition.
3. Then run the `console.log`

setTimeout is a BROWSER API. JS has no timer.

