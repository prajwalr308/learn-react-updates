import React from "react";

// Concurrent rendering debuted officially in React 18. useTransition lets us split urgent updates
// (like text input) from non-urgent work (like filtering a large list) so the UI stays responsive.
export default function TransitionDemo() {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState([]);

  // isPending flags when React schedules work at a lower priority.
  const [isPending, startTransition] = React.useTransition();

  const handleInput = (event) => {
    const value = event.target.value;
    setQuery(value);

    // startTransition defers the expensive work, keeping the main input snappy.
    startTransition(() => {
      const simulatedData = Array.from({ length: 5000 }, (_, index) => `Item ${index}`);
      const filtered = simulatedData.filter((item) => item.includes(value));
      setResults(filtered);
    });
  };

  return (
    <section style={{ padding: "1rem", border: "1px solid #8a2be2", borderRadius: "0.75rem" }}>
      <h3>useTransition (React 18)</h3>
      <p>
        The concurrent renderer lets React prepare non-urgent UI in the background. Type to see the
        spinner while results stream in without blocking the input.
      </p>
      <input value={query} onChange={handleInput} placeholder="Filter 5,000 items" />
      {isPending ? <p>Filtering in the background…</p> : <p>Found {results.length} matches.</p>}
    </section>
  );
}
