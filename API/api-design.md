
- [What is an API?](#what-is-an-api)
- [Rest.](#rest)
- [NodeJS with APIs](#nodejs-with-apis)
- [Express](#express)
- [MongoDB](#mongodb)
- [Codebase](#codebase)
- [Middleware](#middleware)
- [Rest Routes with Express.](#rest-routes-with-express)
- [Routers](#routers)
- [Routes and Controllers](#routes-and-controllers)
 -


## What is an API?

A server that creates an HTTP interface for interacting with data.

"Application Programming Interface"

The phrase is used widely, we will use it to refer to the server.

If you have an APP, the API decides how you can interact with the data.

APIs are built around CRUD:

CREATE, READ, Update, DELETE.

The API is the layer between the client and the database.

## Rest.

What is it? The most popular API design pattern. It combines DB resources, route paths, and HTTP verbs to allow actions to describe the action they are performing.

It works with basic data models. Rest gets hard with complex data- or, simple data models.

## NodeJS with APIs

They are built for APIs that are not CPU intensive. It is async and event driven.When it is async, it can handle many concurrent requests, so if there is a loop, it can block things.

It is not great for CPU intensive work.

Also, there are TONS of open source tools for helping to build APIs.

## Express

It is the gold standard for API frameworks.
It handles sockets, error handling, route matching.

## MongoDB

It is non-relational. It doesnt mattter how the data relates to each other, via JSON. It makes it easy to get started.

There are tons of hosting sources for MONGODB.
It has an awesome ORM: Object relational Manager, called MONGOOSE.

## Codebase

In the `config` directory, there isa  `prod` and a `dev` file, that is used depending on the environment we are using.

## Middleware

It is like something that executes before your server responds.
They must be executed in order.
It can also respond to a request, but thats not what they are designed for.

The middleware's role is to "massage" the data before it gets passed on.

How do you pass an error on from middleware? You usually just attach it to the request object.

## Rest Routes with Express.

Express was designed with Rest in mind.
Route matching can match with exact, regex, glob, or parameters.

Most used is exact matches, and parameter matches.
Express also support HTTP verbs for routing.

`put` and `post` are the exact same thing: `put` is supposed to be used to just update; `post` is supposed to create something new.

You can create Sub routes; almost like nested routes, or a branch on a tree.

## Routers

The router and the app are almost the same thing. A router cant listen- but it can listen for ports and route combinations.

If there was a part of the API with its own set of rules, you would use the a different router for that.

For example, if you need a different auth method for different parts of the app.

This does take away from the simplicity of looking at all the routes on a singular page, to check for comflicts.

You always have to match the path, or the router, and MOUNT it to the app.

Use a schema, and validate it - preferrably on the backend.
Use the schema to create a MODEL: the model holds the instructions, and can be used in Javascript.

Schemas are the instructions for the models: Valdiations, indexes, hooks. The schema is important.

## Routes and Controllers

Controllers are just middleware, with the intent on returning data.

Controllers handle what a route/verb combo can access from the DB.

**They are the final middleware in a stack for a request.**

