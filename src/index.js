import { useState, useEffect } from "react";

const idleish = (fn, { timeoutFallbackMs }) => {
  if ("requestIdleCallback" in window) {
    const handle = requestIdleCallback(fn);
    return () => cancelIdleCallback(handle);
  } else {
    const handle = setTimeout(fn, timeoutFallbackMs);
    return () => clearTimeout(handle);
  }
};

const makeIdleGetter = (workFn, options) => {
  const UNLOADED = {};
  let result = UNLOADED;

  const clear = idleish(() => {
    result = workFn();
  }, options);

  return async () => {
    if (result === UNLOADED) {
      result = workFn();
      clear();
    }

    return result;
  };
};

const useIdleUntilUrgent = (
  func,
  options = {
    fallback: null,
    getNow: false,
    timeoutFallbackMs: 5000
  }
) => {
  const { fallback, getNow } = options;
  const [{ idleGetter }, setIdleGetter] = useState({
    idleGetter: () => ({})
  });
  const [result, setComponent] = useState();

  const workFn = async () => {
    const result = await func();
    setComponent({ component: result.default });
  };

  useEffect(() => {
    setIdleGetter({ idleGetter: makeIdleGetter(workFn, options) });
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
