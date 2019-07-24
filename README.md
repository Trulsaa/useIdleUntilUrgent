# useIdleUntilUrgent

React hook that enables easy use of the idle until urgent loading strategy. This strategy involves fetching resources lazily - either whenever the browser is next idle, or when you request the resources.

This hook takes a function that invokes and returns a Promise. It then returns the result when it has been loaded. In the meantime it returns `null` or the `fallback` value if the optional options object.

The hook uses the [requestIdleCallback](https://caniuse.com/#feat=requestidlecallback) function supported by many modern browsers. If it is not supported then the hook uses `setTimeout(fn, 5000)`

The code is inspired by [Philip Walton's article about the Idle Until Urgent strategy](https://philipwalton.com/articles/idle-until-urgent/), and [Josh Duff's idle-until-urgent package](https://github.com/TehShrike/idle-until-urgent)

## Installation

```bash
$ npm i use-idle-until-urgent
```

or

```bash
$ yarn add use-idle-until-urgent
```

# Example of loading a component

The following component will load the IdleUntilUrgentlyLoadedCompoent when the main tread is idle for the first time, or the first time we pass `getNow` is `true`. IdleUntilUrgentlyLoadedCompoent is displayed when it is loaded but while waiting to load or loading `<div>Loading...</div>` is displayed.

```javascript
import React from "react";

import useIdleUntilUrgent from "use-idle-until-urgent";

const Component = props => {
  const { getNow, onLoad } = props;
  const IdleUntilUrgentlyLoadedComponent = useIdleUntilUrgent(
    async () => {
      const module = await import("./IdleUntilUrgentlyLoadedComponent");
      return module.default;
    },
    {
      // Optional options object
      fallback: () => <div>Loading...</div>, // default null
      getNow, // default false, set this to true on user input to immediately load the component.
      timeoutFallbackMs: 5000 // default 5000 ms
      onLoad, // default () => {}, this is a function that gets called when the idle content is loaded.
    }
  );

  return <IdleUntilUrgentlyLoadedComponent />;
};

export default Component;
```
