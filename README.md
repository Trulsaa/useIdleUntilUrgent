# useIdleUntilUrgent

React hook that enables easy use of the idle until urgent component loading strategy

# Usage

```javascript
const Component = props => {
  const { open } = props;
  const FilterTabs = useIdleUntilUrgent(
    () => import("./IdleUntilUrgentlyLoadedCompoent"),
    <div>Loading...</div>,
    open
  );

  return <IdleUntilUrgentlyLoadedCompoent />;
};
```
