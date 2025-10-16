import React from "react";

// React 18 extended automatic batching to cover async contexts. Prior to this change timers,
// promises, and event handlers outside the React tree caused multiple renders.
export default function AutomaticBatchingDemo() {
  const [count, setCount] = React.useState(0);
  const [status, setStatus] = React.useState("Idle");

  const triggerAsyncWork = () => {
    setStatus("Scheduling…");

    // Simulate async work such as a fetch. In React 17 this would produce two renders.
    Promise.resolve().then(() => {
      setCount((n) => n + 1);
      setStatus("Completed in a single render thanks to automatic batching!");
    });
  };

  return (
    <section style={{ padding: "1rem", border: "1px solid #ff9f1c", borderRadius: "0.75rem" }}>
      <h3>Automatic Batching (React 18)</h3>
      <p>
        Async updates scheduling multiple state changes now batch together automatically, reducing
        wasted renders and improving paint stability.
      </p>
      <button onClick={triggerAsyncWork}>Run async update</button>
      <p>Count: {count}</p>
      <p>Status: {status}</p>
    </section>
  );
}
