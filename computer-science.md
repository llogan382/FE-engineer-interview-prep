- [Complete intro to Computer Science.](#complete-intro-to-computer-science)
  - [Big O Notation.](#big-o-notation)
  - [Why does it matter?](#why-does-it-matter)
  - [Tradeoffs](#tradeoffs)
  - [Bubble Sorts](#bubble-sorts)
- [Insertion sort](#insertion-sort)
  - [Recursion](#recursion)
  - [Merge Sort](#merge-sort)
- [quick sort](#quick-sort)
- [Recursion](#recursion-1)
- [Linked Lists](#linked-lists)


# Complete intro to Computer Science.

This is a course taught by Brian Holt covering some of the basics of Computer Science, focused towards Front End Engineers. Some of the basics of computer science will be taught here, the basics of some of the algorithms.

## Big O Notation.

It is important to know this for interviews. What is it? It is a way to talk about how efficient an algorithm is. Computer science and math have a lot in common. If you could zoom out and just look at the important details, you would be able to see the complextiy, or the Big O notation.

Take a look at the following: `3x^2 + x + 1`, the `x^2` is the only part to pay attention to. So the question to ask yourself, is how many instructions will I be giving hte CPU to run a function?

Take this function:

```js
function crossAdd(input){
  var answer = []
  for (var i = 0; i < input.length; i++){
    var goingUp = input[i];
    var goingDown = input[input.length - 1 -i];
    answer.push(goingUp + goingDown);
  }
  return answer;
}
```
How long is the input? If it is 10, this would be quick; if input is 1,000,000, the cpu has to process it all. The shortcut is to just look at how many loops there are. If there are no loops, it is *CONSTANT*.

Example #2:
```js
function find(needle, haystack){
  for(var i = 0; i < haystack.length; i++){
    if(haystack[i] === needle) return true;
  }
}
```

What is the array is a billion, but we find it as the first element? It would be quick. There is a difference between best case scenario, worst case scenario, and average case scenario.

So if a function loops once, it is CONSTANT, or O(n) (called "O of n")- because if the length of the array/input increases, the function will only run through each item (in the worst case scenario) one time.

If the function loops twice, it is squared, or **Quadriatic**, (O^n), and will increase in complexity twice for every unit that the input increases by one.

## Why does it matter?

For many programs, this doesnt matter- most modern Javascript programs are running on devices that can handle most types of sorting. However, if running something like Netflix on a Roku stick, where memory is not highly available, space (and complexity) is important to take into consideration.

So when running a program, it is important to ask the question:
- what kind of device will be running?
- How big will the inputs/data set be?
- Is it more important to be efficient, or to be maintainable for other engineers?
- How much memory/ram will be available to the program?

## Tradeoffs

Things can be done multiple ways. When talking with an interviewer, if you talk about the tradeoffs, there is an advantage with the person interviewing. Advantages for the user experience versus advantages for cost and processing complexity?

If I am putting a loop inside another loop, it is generally a bad idea. But if there is a better way, then what could the better way be?

- There is no rule, no "best way"
- What is the best case/worst case scenario. Quick sort and merge sorts?
- If a for loop has 10,000 lines, there are more things to consider.
- Is it important? If a process takes a little longer, will it impact the user or cost the business more?
- Is it more important for the code to be read by other engineers or the computer? Code should be optimized for readability for my/my team's later self. Only optimize if I need to optimize.
- Always prioritize for simple code.
- Human time is more expensive than computer processing time.
- **Dont optimize prematurely**
- 99% of the time, use the built-in sorting methods of the code base. `.sort` is so tested, there will not be bugs, and it is so reliable. If you write your own sorting algo, you probably will run into issues.
- If you build something, then it scales, worry about the code after it scales.
- Functional programming creates and erases many variables. Is it necessary or helpful for a program that will scale?
- Can the original array be destroyed?

It is possible to keep re-iterating, but will it improve the experience for the users?

## Bubble Sorts

There are algorithms that are much better. A lot about computer science is about sorting. If you can take a large list of items, and sort them, it demonstrates a way to optimize a way to use the computer to process.

Bubble sort- the biggest numbers get sorted easily.

Look at this array:
```js
[1,5,4,2,3];

// Are 1 and 5 out of order? No.
// Are 5 and 4 out of order? Yes, swap places.

[1,4,5,2,3];

// Are 5 and 2 out of order? Yes, swap;
[1,4,2,5,3];

// Are 5 and 3 out of order? Yes, swap;
[1,4,2,3,5];

// Called Bubble Sort because the largest value, 5 bubbles to the top. Is it sorted yet? no.
// Then, if any was swapped in the array, do it again. Are 1 and 4 out of order? No.

// Are 4 and 2 out of order? yes, swap;

[1,2,4,3,5];

// Are 4 and 3 out of order? Yes,swap:
[1,2,3,4,5];
// Are 4 and 5 out of order? No, this is an optimization, and you dont have to ask because the last loop proved this.
// Did anything change? Yes, loop again. Nothing is out of order, so the loop is done.
```

There is an outer loop that checks to see if the previous loop changed the array (a while loop).
The worst-case scenario is an exact reverse case sort: 5,4,3,2,1. Every loop would have to swap something.

Spatial complexity? It is constant. We arent creating any new arrays.

**IS this sort stable?** For this to be a stable sort, if something comes first, will it come first when it comes back from the algorithm? The answer is YES, this is stable. In the above, if each item was an object, each object would remain in the same order.

Is it destructive? Yes, it re-orders the original input array (rather than making a copy of the array before sorting).


# Insertion sort

This will always be a faster than bubble sort.

What is the Big O of this list? The best case scenario, everything is in order. Worst case scenario is that the list is in reverse order.

Spatial complexity? o(1)
Insertion Sort is STABLE (if there are 2 items side by side, they will remain side by side.

## Recursion

What if you have a problem that is too big to solve? You break it down into small parts, and then stitch the answers back together.

In Javascript, recursion is a function that calls itself.

**When is recursion useful?** If your problem is smaller versions of the same problem, the answer could lay in recursion.

```js
function fibonacci(n) {
  // base case
  if (n === 2 || n === 1) {
    return 1;
  } else if (n <= 0) {
    return 0;
  }

  // recursive calls
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

Recursion isnt the most efficient, but the code can be easy to read.

## Merge Sort

It breaks everything down into an array of 2, and sorts them. Then, it stitches the items back together, after they are sorted.

Most Javascript engines use merge sort under the hood (when using something like .sort)
Every number gets looked at once, yet the longer it gets, it doesnt mean there are more comparisons.
If there is recursion, it is likely going to have n(log(n)) as its big O.

# quick sort

Also breaks the array down, with a "pivot"

# Recursion

In short: When a function calls itself.

It can keep code short and DRY. The most important part: It must "return", or it will cause a stack overflow.

# Linked Lists

Just a list of items in order, each with a pointer to the next item.
You can do quick removal of items in the middle of an array- just move the pointer to the next item.
The FIND for a linked list is much slower- unless you have a reference to the value.
