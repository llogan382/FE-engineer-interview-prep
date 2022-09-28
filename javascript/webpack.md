# Why?

Why have webpack? What is the benefit? How is webpack used?

JS can only be executed in 2 ways: Inline, or in a script file that is loaded.

# Problems

JS is loaded. Once everything is loaded, the scripts can interfere with one another: IIFE functions, global scope, side effects, etc.

# Concatenate

If each file is loaded as an IIFE, files can all be loaded without any interference from other files. All they do is concatenate the files together. HOWEVER, every time you change one file, you must rebuild the whole thing.

# Problem: Dead code.

Libraries are added, but not all of the code from the library is used. If you are loading a date library, for example, and only using it for one line, there is a lot of unused code.
If you app only uses 10% of the code, ALL of the code still shifts.

# Node.js

This is foundational for linters, commands. But there is a problem: How to load JS without a DOM?
To be able to use other pieces of files, there is the `require` keyword, which allows you to pull in MODULES.

Inports can be named.

`const {add, subtract} = require('math')`

There, scope is fixed! You are only importing a piece of the file instead of the whole library.

# Problems?

No browser support for modules.
People are using modules in weird ways. And the resolutions algorithm is syncronous- it is pretty slow.
People want to ship WEB modules.

BUNDLERS got created - like `browserify` and `requirejs`.
There were problems with this as well.

# More problems:

No static async/lazy loading. It is all loaded up front. Common JS is too easy to bloat.

# Solution?

After 10 years being developed, there is ESM
ESMASCRIPT MODULES.
```js
import {unique, for-of} from 'lodash'
import * as utils from 'utils'

export const unique = uniqueCost({4, 8, 48});
```


Problems here too: it doesnt work fully with node. How does it work in the browser?
It is very, very, very slow in the browser.

# Introduction to webpack

Webpack is a module bundler. It lets you write any module format, and they work in the browser.

AND

It compiles all these bundlers to work in the browser.
AND
code splitting, lazy loading.
AND
a large ecosystem.

## How did it get started?

This guy from Germany, wrote it in the beginning (in 2012), because he was curious about writing code-splitting into his app- something he learned from Google.

Then, there was a conference where TOBIAS (the German guy) introduced webpack at a conference how Instagram was using webpack.

Then, DAN ABRAMOV got on to stack overflow, and asked, "what is hot module reloading?"
THe answer helped write redux.

Webpack exploded- it got adopted by the react ecosystem.
VueJS and Angular use it now too.

## how to use it?

use the `webpack.config.js` file, with the `module.exports` file.

This is the only way to compile and scale.
