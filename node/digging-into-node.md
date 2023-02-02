- [Digging into Node.js](#digging-into-nodejs)
- [Introduction](#introduction)
  - [This middle end](#this-middle-end)
  - [Node Perspective.](#node-perspective)
  - [Console Log and Process Stdout](#console-log-and-process-stdout)


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
