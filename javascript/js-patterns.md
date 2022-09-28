# JS and React Patterns

Some notes from the front end masters course, "A Tour of Javascript and React Patterns".

1. JS PAtterns
   1. [Module Patterns](#module-patterns)
   2. [Singleton](#singleton)
   3. [Proxy](#proxy)
   4. [Observer](#observer)
   5. [Factory](#factory)
   6. [Prototype](#prototype)
2. React Patterns
   1. [Con/pres pattern](#con-pres)
   2. [HOC pattern](#hoc)
   3. [Render Props pattern](#render-props)
   4. [Hooks pattern](#hook)
   5. [Provider pattern](#provider)
   6. [Compound pattern](#compound)
3. Performance Patterns
   1. Bundling, compiling, minifying, tree shaking
   2. Static import
   3. import on visitbility
   4. route-based splitting
   5. Browser hints
4. Rendering Patterns
   1. Client side rendering
   2. Staitc rendering
   3. Incremental static rendering
   4. Streaming SSR

---

## Module Patterns

Used to break code up into re-usable pieces, instead of many smaller pieces. Then, you only export values that are needed. When values arent exported, they are only available within that module.

JS has "implied globals". After ES2015, there are built-in modules.

It is easy to keep values within a module, and it is easier to reuse code.

You can either use `type: module` in your `package.json`, or use `.mjs` files.

## Singleton

A single instance that can be used throughout an application.
If there is a single counter, it can be controlled from several different files.
There is only 1 instance.
No other part of the app should be able to change the object/class: no properties or methods could be added.
It can only be instantiated.
In ES2016, we dont need classes: just objects.

Pros:

- It is good for memory
- modules are singletons by default.
- dependency hiding. Modifying it without knowing it.
- It is hard to test.
- They are great for controlling global state within an application.

## Proxy

## Observer

## Factory

## Prototype

## Con pres

## HOC

## Render Props

## Hooks

## Provider

## Compound
