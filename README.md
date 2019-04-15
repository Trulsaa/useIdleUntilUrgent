# useIdleUntilUrgent

React hook that enables easy use of the idle until urgent component loading strategy. This strategy involves fetching resources lazily - either whnever the browser is next idle, or when you request the resources.

This hook takes a function that invokes and returns the result of an `import("paht")` function that imports a react component. It then returns the compoenent when it has been loaded. In the meantime it returns null or the second optional argument.

The hook uses the [requestIdleCallback](https://caniuse.com/#feat=requestidlecallback) function supported by many modern browsers. If it is not supported then the hook uses `setTimeout(fn, 5000)`

The code is inspired by [Philip Walton's article about the Idle Until Urgent strategy](https://philipwalton.com/articles/idle-until-urgent/), and [Josh Duff's idle-until-urgent package](https://github.com/TehShrike/idle-until-urgent)

# Usage

The following component will load the IdleUntilUrgentlyLoadedCompoent when the main tread is idle for the first time, or the first time we pass `loadNow === true`. IdleUntilUrgentlyLoadedCompoent is displayed when it is loaded but while waiting to load or loading `<div>Loading...</div>` is displayed.

```javascript
const Component = props => {
  const { loadNow } = props;
  const FilterTabs = useIdleUntilUrgent(
    () => import("./IdleUntilUrgentlyLoadedCompoent"),
    <div>Loading...</div>,
    loadNow
  );

  return <IdleUntilUrgentlyLoadedCompoent />;
};
```
