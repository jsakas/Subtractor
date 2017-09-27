# Subtractor

This document will outline the specifications and patterns of the source code.

## Observer Pattern

While the application has many classes and functions, any class that is expected to have direct interaction with the UI should be implemented as an **Observable**, using the [Observer pattern](https://en.wikipedia.org/wiki/Observer_pattern).

A barebones example of an Observable can be found in this project here: [Observe.js](Observe.js).
