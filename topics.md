# From the review guide:


# Web security issues

Dom manipulation.
Do as little as possible.

Browser Events. Everything that cante be done in Node.

HTTP headers
XML is used to exchange between the user agent and the server.

CSS Layout Techniques
Prevent layout shift. Grid, Flexbox.

AssetLoading
Load immediately. Everything User needs should be done in less than .1 seconds.
If not, see if you can defer. If the user leaves, there will be no analytics.


Async Requests
Pre-load if possible. Keep in mind variety of user devices- and bandwidths. In USA, mostly not a problem.
Talk about the stack- the JS stack is FIFO- starting with JS, then all browser/items will go into the queue until it is empty.

Memory Resource Management
Memoize whatever is possible.
Re-render as little as possible.
JS does good garbage collect- but dont create a ton of variables if they arent needed- like copying arrays, rather than modifying array in place.
Reduce loops- keep big O as small as possible.


Algorithms
Not gonna lie, dont use these. But I want the challenge of writing more efficient, scalable code.

System Designs
Keep business logic away from rendering components.
And write tests.


Accessibility
It is the ethical thing to do- I like using react testing library, it forces

Analytics


RENDERING:
Using TRANSLATE will help reduce layout shift.

# What is left?

Studying has taught me that I need to learn

`array.reduce()`
accumulators in recursive functions.

And the new method, `new Map()`

And that I should have learned with Leetcode sooner.


## Function Arguments

A **parameter** is in the function definition.
An **argument** is what gets passed in on the function call.


