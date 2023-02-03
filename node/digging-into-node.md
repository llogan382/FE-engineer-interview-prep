- [Digging into Node.js](#digging-into-nodejs)
- [Introduction](#introduction)
  - [This middle end](#this-middle-end)
  - [Node Perspective.](#node-perspective)
  - [Console Log and Process Stdout](#console-log-and-process-stdout)
  - [Console Error and process stderr](#console-error-and-process-stderr)
- [Command line scripts](#command-line-scripts)
  - [Setting up a command line script.](#setting-up-a-command-line-script)


# Digging into Node.js

These are notes from the [Front End Masters Course, Digging into Node](https://frontendmasters.com/courses/digging-into-node/), taught by Kyle Simpson.

Though these are my notes, I highly encourage you to take the course yourself. It is totally worth the monthly bill!

# Introduction

Node.js is 10 years old.

## This middle end

The front end and the back end are different.

Routing, templating, formatting, responding to API requests; they all bridge the gap between BROWSER and SERVER.

There are lots of pieces that connect the Frontend to the backend.

THe backend can be any sort of thing.

This means the backend doesnt have to worry about what kind of device a user is using.

## Node Perspective.

This is how to frame the conversation. It is not just "Javascript on the server".

It is the implementation of low-latency network connections. He was building it in Ruby.

He needed an *event loop*, and knew he had to use JS: so he could implement the loop.

It created a model for I/O systems on a synchronous language.

Threads are good for CPUs. You can do I/O with threading, but the Asynch event loop is better.

Lets start at the beginning: How can we use Node to write `bash` statements.

## Console Log and Process Stdout

how can we do `hello world` in the console on node? Node is on the server, and doesnt have a screen.

It relies on **POSIX**, which is a C style program to interact with Linux; basically, this is 3 streams that model the *input, output, and error*.

How do we access these streams in Node?

The main way to access is through PROCESS.

`process.stdout` will give us access to the stream.

The whole point of code is to rin i/o as efficiently as possible- and every time it gets translated/converted, it slows down.

## Console Error and process stderr

Also, there is `console.error`. This is a different stream.

By default, the shell interprets both of them the same.

> Tip: If you are doing errors, do `console.error` so the i/o is written to a LOG. This is so important for debugging.

There is also `process.stdin`. These are much more tricky than stdout.

# Command line scripts

## Setting up a command line script.

How set one up, and have it run like a linux/bash script?

You can put this comment at the top, and it will be interpreted as a bash script. You give it a file to use for the interpretation.

```
#!/usr/bin/env node
```

This tells the system to go find where `node` is installed, and use it.
Also, add `use strict`

Then you can change permissions on the file:

`chmod u+x ex1.js`

then, the `-x` permissions is added to the file; then you can run `./ex1.js` instead of typing `node` in the front.

Put something in to give yourself notes about the file, and how it is used:

```js


printHelp();

function pringHelp(){
  console.log("this is how to use ex1")
  console.log( " ex1.js --help" );
}


```
