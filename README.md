# useIdleUntilUrgent

React hook that enables easy use of the idle until urgent component loading strategy. This strategy involves fetching resources lazily - either whenever the browser is next idle, or when you request the resources.

This hook takes a function that invokes and returns the result of an `import("paht")` function that imports a react component. It then returns the component when it has been loaded. In the meantime it returns `null` or the `fallback` value if the optional options object.

The hook uses the [requestIdleCallback](https://caniuse.com/#feat=requestidlecallback) function supported by many modern browsers. If it is not supported then the hook uses `setTimeout(fn, 5000)`

The code is inspired by [Philip Walton's article about the Idle Until Urgent strategy](https://philipwalton.com/articles/idle-until-urgent/), and [Josh Duff's idle-until-urgent package](https://github.com/TehShrike/idle-until-urgent)

## Installation

```bash
$ npm i @use-it/event-listener
```

or

```bash
$ yarn add @use-it/event-listener
```

# Example

The following component will load the IdleUntilUrgentlyLoadedCompoent when the main tread is idle for the first time, or the first time we pass `getNow` is `true`. IdleUntilUrgentlyLoadedCompoent is displayed when it is loaded but while waiting to load or loading `<div>Loading...</div>` is displayed.

```javascript
const Component = props => {
  const { getNow } = props;
  const IdleUntilUrgentlyLoadedCompoent = useIdleUntilUrgent(
    () => import("./IdleUntilUrgentlyLoadedCompoent"),
    {
      fallback: <div>Loading...</div>, // default null
      getNow, // default false, set this to true on user input to immediately load the component.
      timeoutFallbackMs: 5000 // default 5000 ms
    }
  );

  return <IdleUntilUrgentlyLoadedCompoent />;
};
```
