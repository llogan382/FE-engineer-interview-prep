# Testing Frameworks

THere are a lot of opinions about this. THere are tradeoffs no matter which route you take.

We find bugs in our systems all the time. We find bugs often.

What kinds of bugs are there?

- Software
- Memory leaks
- Logic
- Integration bugs
- accessibility.

How do you fix bugs?

- Typescript/Babel
- Linting. ESLint. This is a form of testing.
- Testing. This can catcha  big category of bugs.

What kinds of tests?

- Unit tests?
- End to End tests
- Integration testing
- Regression
- Accessibility testing.

A UNIT TEST is testing just a unit- or a simple piece of the code.

INTEGRATION testing is how your app integrates with other systems.

E2E (or *end to end* testing) mocks how a user will use the site/app.

## Simple testing.

Throwing an error is a simple way of testing if a function returns the expected value.

Testing frameworks can point to the place where the code failed, and streamline the debugging process.

A test is something that throws an error if there is a bug. a *good test* will help tell you where that bug is and how to fix it. A framework will have many tests and tell you how to fix the bugs.

**JEST** has great error messages to help the users find the place in the code where the error was found.

MOCKS Are functions that keep track of how they are called, and what they are called with. Then, we use assertions to check.
