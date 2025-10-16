import React from "react";

// useDeferredValue (React 18) lets us read a lagging snapshot of state. This is perfect when you
// need to keep low-priority UI in sync without blocking user input.
export default function DeferredValueDemo() {
  const [inputValue, setInputValue] = React.useState("");

  // The deferred value updates after urgent renders finish.
  const deferredValue = React.useDeferredValue(inputValue);

  return (
    <section style={{ padding: "1rem", border: "1px solid #0f8a5f", borderRadius: "0.75rem" }}>
      <h3>useDeferredValue (React 18)</h3>
      <p>
        Watch how the deferred preview lags slightly behind the raw input, simulating a streaming
        search experience.
      </p>
      <label>
        Immediate value:
        <input
          style={{ marginLeft: "0.5rem" }}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
      </label>
      <p>Deferred preview: {deferredValue}</p>
    </section>
  );
}
