# Components

UI components are written as [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components).

In order to achieve two-way binding with an instance of the Subtractor synth, we use the [Observer pattern](https://en.wikipedia.org/wiki/Observer_pattern). Components are classified as **Observers**.

## Component API

A UI component should implement the following attributes:

- `observer` - A refernce to an Observable
- `bind` - A reference to a property of an Observable, which is defined using `set` and `get` syntax
- `label` - A reference to a property of an Observable that returns a friendly output of the value

A component can then be used like:

```
<component observer="subtractor.filter1" bind="type" label="frType"></component>
```

In the above example, the following are true:

- `subtractor.filter1` is an Observable
- `subtractor.filter1.freq` is a propery of the Observable
- `subtractor.filter1.frFreq` is a friendly output of the observed property
  - Instead of returning `1`, it will return something consumable to the user like `lowpass`

A barebones example of an Observer can be found in this project here: [Observe.js](../Observe.js).

