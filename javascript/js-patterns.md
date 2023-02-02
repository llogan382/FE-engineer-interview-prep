
- [JS](#js)
  - [Module Patterns](#module-patterns)
  - [Singleton](#singleton)
  - [Proxy](#proxy)
  - [Observer](#observer)
  - [Factory](#factory)
  - [Prototype](#prototype)
- [React Patterns](#react-patterns)
  - [Container Presentation pattern.](#container-presentation-pattern)
  - [Higher Order Component Patterns.](#higher-order-component-patterns)
  - [Render Props Pattern.](#render-props-pattern)
  - [Hooks pattern](#hooks-pattern)
  - [Provider Pattern](#provider-pattern)
  - [Compound Pattern](#compound-pattern)
- [Bundling and Compiling.](#bundling-and-compiling)
- [Rendering Patterns.](#rendering-patterns)
  - [Core Web Vitals](#core-web-vitals)
  - [Client Side and Static Rendering.](#client-side-and-static-rendering)
  - [Incremental Rerendering and SSR](#incremental-rerendering-and-ssr)



# JS

Some notes from the front end masters course, "A Tour of Javascript and React Patterns".
[Here is a link to the course](https://frontendmasters.com/courses/tour-js-patterns/)


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

Normally when using an object, you can modify it.
With Proxy, you use a PROXY in between. So, instead of modifying something directly, you modify it with a PROXY.

JS has a built-in proxy.

It is like an object, or a CLASS, where you use getters and setters.

It is easy to ADD FUNCTIONALITY to an object.
It is great to add VALIDATION (or Types?).

It can lead to performance issues, but this can be avoided by using ASYNC.
Be sure to keep them SMALL so they can be fast.



## Observer

Observables. There are multiple parts at play.
It can be observed by subscribers when an event occurs.

They have `notify`, `subscribe`, and `unsubscribe`.

All it cares about is pushing the changes to the subscribers.

And UNSUBSCRIBE removes something from that list.

## Factory

Factory functions.

It is simple. It is easy to use arrow functions to return an object.

You dont have to recreate the same object every time. You can create the same thing many times.



## Prototype

For a factory, it is easy to have many objects with the same pattern.

However, whenever we create a new object, we use memory for each and every object.

Instead, we can use PROTOTYPE, which is a CLASS.

Anything on the PROTOTYPE, or if there is any functionality that is SHARED between objects, we go up the PROTOTYPE chain.

In the browser, if you create an object, you can see the METHODS in the prototype. This way, memory is saved.

Prototypes can be created with `Object.create` or `new Object`

# React Patterns

How to use components, how is data shared.

## Container Presentation pattern.

This contains two parts:

1. The container that does LOGIC, and doesnt render anything.
2. The **PRESENTATION** pattern.

One component will FETCH the data, and the other will RENDER it.
**CONTAINER** is just responsible for the STATE.

If things are rendered the same way, it can be rendered the same way.

Hooks replaces this pattern in some ways.
This is good for a SEPARATION OF CONCERNS.

Question: Is it common to use different directories for this?

A: Everyone has their own system for naming things.


## Higher Order Component Patterns.

Good for adding LOGIC to other components by wrapping them.
It takes components, with thier props, and WRAPS them.

This is also good for SEPARATION OF CONCERNS. However, it can create naming collisions.

It is often used for STYLES.

Be sure to MERGE or MODIFY props.

Idea: Maybe pass permissions this way?

here is an example:

```js
function withStyles(Component) {
  return props => {
    const style = {
      padding: '0.2rem',
      margin: '1rem',
      // Merge props
      ...props.style
    }

    return <Component {...props} style={style} />
  }
}

// The `Button` component has a `style` prop, that shouldn't get overwritten in the HOC.
const Button = () = <button style={{ color: 'red' }}>Click me!</button>
const StyledButton = withStyles(Button)
```


## Render Props Pattern.

We pass props, and those props are components.
It makes it easy to re-use components.

Benefits:

- Reusable. we can make components that receive render props highly reusable for multiple use cases.
- Separation of concerns. Keep logic separate from rendering components.
- Solutions to HOC problems. Since we pass props, we sole the HOS implicit props issue.

LIMIT:
They are not needed as much with HOOKS.

```js
import React from 'react';

export function Kelvin({ value }) {
  return (
    <div className="temp-card">
      The temperature in Kelvin is: <span className="temp">{value}K</span>
    </div>
  );
}

export function Fahrenheit({ value }) {
  return (
    <div className="temp-card">
      The temperature in Fahrenheit is:
      <span className="temp">{value}°F</span>
    </div>
  );
}

export default function TemperatureConverter(props) {
  const [value, setValue] = React.useState(0);

  return (
    <div className="card">
      <input
        type="number"
        placeholder="Degrees Celcius"
        onChange={(e) => setValue(parseInt(e.target.value))}
      />
      {props.renderKelvin({ value: Math.floor(value + 273.15) })}
      {props.renderFahrenheit({ value: Math.floor((value * 9) / 5 + 32) })}
    </div>
  );
}
```

The above code would be implemented like this:

```js
import * as React from 'react';
import './style.css';
import TemperatureConverter, {
  Kelvin,
  Fahrenheit,
} from './TemperatureConverter';

export default function App() {
  return (
    <TemperatureConverter
      renderKelvin={({ value }) => <Kelvin value={value} />}
      renderFahrenheit={({ value }) => <Fahrenheit value={value} />}
    />
  );
}
```

## Hooks pattern

If you want to have several components using the same component, use hooks.
Its not like shared state.
It is a way to add stateful logic to a component.

There are many benefits.
It simplifies components to where you can keep stateful logic out of the component.

It makes it really easy to share logic.

An awesome site to use to find re-usable hooks, is [useHooks.com](https://useHooks.com)

## Provider Pattern

If there was a LIGHT MODE and a DARK MODE for a site.

Many times we use prop drilling- passing something down from parent to child components.

This way, you only wrap the components that it applies to.

There are **PROVIDERS** and **CONSUMERS**.

This is better for scalability.

For performance, it is bad because every component that consumes the PROVIDER prop will re-render every time it changes.

> Tip: Check the network tab on load to see how many times a component it being loaded.


To implement the **PROVIDER**, use the `createContext()` hook, like this:

```js
export const ThemeContext = React.createContext(null);

export function useThemeContext() {
  const { theme, setTheme } = useContext(ThemeContext);

  return { theme, setTheme };
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```


Now, wrap any component in `ThemeProvier` and it will have access to `theme` and `setTheme` properties.


Applying this context would look something like the following:

```js
import { useThemeContext } from "../context";

const LandingPage = () => {
  <ThemeProvider>
    <TopNav />
    <Main />
  </ThemeProvider>;
};

const TopNav = () => {
  const { theme } = useThemeContext();
  return (
    <div style={{ backgroundColor: theme === "light" ? "#fff" : "#000 " }}>
      ...
    </div>
  );
};

const Toggle = () => {
  const { theme, setTheme } = useThemeContext();
  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      style={{
        backgroundColor: theme === "light" ? "#fff" : "#000",
        color: theme === "light" ? "#000" : "#fff",
      }}
    >
      Use {theme === "light" ? "Dark" : "Light"} Theme
    </button>
  );
};
```

Tip: Wrap the most common ancestor of a component.
If not, it will cause unexpected re-renders (and make your code harder to read!)


the `useContext` hook helps with the rendering side.

## Compound Pattern

Using a **SEARCH BAR**.

The user clicks on a dropdown, and it populates with several fields from components.

But how do you use logic within this? If it is a dropdown?

A: You create a `createContext` and it creates a value, and a setValue method, and renders children.

So you can have 1 component, with several variations.
It makes it easier to add different components, statefully.
Here is an example of creating the component:

```js
const FlyOutContext = React.createContext();

export function FlyOut(props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const toggle = React.useCallback(() => setOpen((state) => !state), []);

  return (
    <FlyOutContext.Provider value={{ open, toggle, value, setValue }}>
      <div>{props.children}</div>
    </FlyOutContext.Provider>
  );
}

function Input(props) {
  const { value, toggle } = React.useContext(FlyOutContext);

  return <input onFocus={toggle} onBlur={toggle} value={value} {...props} />;
}

function List({ children }) {
  const { open } = React.useContext(FlyOutContext);

  return open && <ul>{children}</ul>;
}

function ListItem({ children, value }) {
  const { setValue } = React.useContext(FlyOutContext);

  return <li onMouseDown={() => setValue(value)}>{children}</li>;
}

FlyOut.Input = Input;
FlyOut.List = List;
FlyOut.ListItem = ListItem;
```

And this is how it would be used:

```js
import * as React from 'react';
import './style.css';
import { FlyOut } from './Input/Input';

export default function App() {
  return (
    <div className="card">
      <FlyOut>
        <FlyOut.Input placeholder="Enter an address, city, or ZIP code" />
        <FlyOut.List>
          <FlyOut.Item value="San Francisco, CA">San Francisco, CA</FlyOut.Item>
          <FlyOut.Item value="Seattle, WA">Seattle, WA</FlyOut.Item>
          <FlyOut.Item value="Austin, TX">Austin, TX</FlyOut.Item>
          <FlyOut.Item value="Miami, FL">Miami, FL</FlyOut.Item>
          <FlyOut.Item value="Boulder, CO">Boulder, CO</FlyOut.Item>
        </FlyOut.List>
      </FlyOut>
    </div>
  );
}
```


TRADEOFFS:

- Good state management.
- single import
- NEGATIVE: nested components dont work as well
- NEGATIVE: There may be naming collisions.

# Bundling and Compiling.

This section is a little different. It is more based on, how can we optimize our code before it is rendered for the user?

Everything we write must be shipped to the user.

And every import we use requires imports.

There are bundlers, which makes the code executable in many environments. It has an entry file, and bundles from there.

Webpack is the most commonly used.

There are also compilers: Which COMPILES JS/TS into a version that the browser can run.

So, if you are using the latest version of JS, you must make sure that users use that same version of JS.

**BABEL** will transform the code in a way that the browser can read it.

Typescript is also a compiler.

There is also a MINIFIER.
Terser is one. The bundler takes care of MINIFYING the code.

People are working to put all of these things together, to BUNDLE, COMPILE, and MINIFY.

SWC is one, and it is rust-based.

For performance, we must think of a few things, like Bundle Splitting.

In order to avoid LARGE bundles, you can just import partials.

TREE SHAKING removes the code that isnt used, which is usually built in to the bundler.

# Rendering Patterns.

There are many options, and tradeoffs. One thing is the **CORE WEB VITALS**

## Core Web Vitals

- TTFB Time to first bute
- FCT First contentful Paint
- LCP Largest contentful paint
- TTI Time to interactive
- CLS Cumulative Layout Shift
- FIP First Input Delay

## Client Side and Static Rendering.

With React, the HTML loads the `app` root, which renders nothing.

Then, as the BUNDLE comes in, it renders automatically.

The TTFB is usually pretty quick, just the HTML

However, it still needs the BUNDLE, which can be large, can take a while.

To get around this, there is **STATIC RENDERING**.

The HTML, instead of just having the root, has everything else.

It has less to pull from the bundle.

By default, NextJS uses STATIC RENDERING.

You can see what gets loaded from the **NETWORK TAB**

This can also be CACHED in a CDN.
However, you need additional requests to fetch the bundle, and add things like event handlers; this is called the *hydration*.

`getStaticProps` runs at build time. It will FETCH the data, and push to the HTML that goes on our servers.

Users get the same output.

What if you have to do this for a large number of pages?

If we deploy, and update, it will have to rebuild all pages.

you can use `useSwr` to get around this.

## Incremental Rerendering and SSR

You can opt to pre-render certain pages, but how many need to be generated on build?

The Cache can be invalidated after a certain amount of time, and re-fresh new data.

**Server Side Rendering** is built on the server, and each page is re-built each time. In general, avoid this. The server has to re-build each page.

In Next, instead of `getStaticProps`, you can use `getServerSideProps`. It is built on the server, instead of pre-built during build time.

Downside: It does not have anything cached, so if the server goes down, the whole site goes down.


**Streaming SSR** can HYDRATE components

It allows for partially rendered pages, and SERVER RENDER anything else that needs server specific data.
