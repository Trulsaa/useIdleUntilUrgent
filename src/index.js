import { useState, useEffect } from "react";

const idleish = (fn, timeoutFallbackMs = 10000) => {
  if ("requestIdleCallback" in window) {
    const handle = requestIdleCallback(fn);
    return () => cancelIdleCallback(handle);
  } else {
    const handle = setTimeout(fn, timeoutFallbackMs);
    return () => clearTimeout(handle);
  }
};

const makeIdleGetter = workFn => {
  const UNLOADED = {};
  let result = UNLOADED;

  const clear = idleish(() => {
    result = workFn();
  });

  return async () => {
    if (result === UNLOADED) {
      result = workFn();
      clear();
    }

    return result;
  };
};

const useIdleUntilUrgent = (func, fallback, getNow) => {
  const [{ idleGetter }, setIdleGetter] = useState({
    idleGetter: () => ({})
  });
  const [result, setComponent] = useState();

  const workFn = async () => {
    const result = await func();
    setComponent({ component: result.default });
  };

  useEffect(() => {
    setIdleGetter({ idleGetter: makeIdleGetter(workFn) });
  }, []);

  if (getNow && !result) {
    idleGetter();
  }

  if (!!result) {
    return result.component;
  } else {
    return () => fallback;
  }
};

export default useIdleUntilUrgent;
