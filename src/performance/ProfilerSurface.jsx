import React from "react";

// Profiler debuted in React 16.9 and remains the go-to API for capturing render timings directly
// inside React. This wrapper logs measurements and exposes a handy hook for test assertions.
const subscribers = new Set();

export function useProfilerLog(callback) {
  React.useEffect(() => {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
  }, [callback]);
}

export default function ProfilerSurface({ id, children, onReport }) {
  const onRender = React.useCallback(
    (actualId, phase, actualDuration, baseDuration, startTime, commitTime) => {
      const payload = { actualId, phase, actualDuration, baseDuration, startTime, commitTime };
      console.table(payload);
      if (onReport) {
        onReport(payload);
      }
      for (const subscriber of subscribers) {
        subscriber(payload);
      }
    },
    [onReport],
  );

  return (
    <React.Profiler id={id} onRender={onRender}>
      {/* Wrapping the children lets us collect timing info without modifying their internals. */}
      {children}
    </React.Profiler>
  );
}
