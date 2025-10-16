import React from "react";

// Hooks landed in React 16.8 and fundamentally changed how we write reusable logic.
// This demo shows a few common primitives side-by-side.
export default function HooksDemo() {
  // useState replaces class component state while keeping logic compact.
  const [count, setCount] = React.useState(0);

  // useRef stores a mutable value that persists across renders without triggering a re-render.
  const renderCountRef = React.useRef(0);
  renderCountRef.current += 1;

  // useMemo caches derived data so heavy computations only rerun when inputs change.
  const doubled = React.useMemo(() => count * 2, [count]);

  // useCallback makes it easy to memoise callbacks passed to memoized children.
  const increment = React.useCallback(() => setCount((n) => n + 1), []);

  // useEffect wires up imperative logic such as subscriptions or DOM mutations.
  React.useEffect(() => {
    document.title = `Hooks count: ${count}`;
    return () => {
      // Cleanup demonstrates how to avoid leaks when the component unmounts.
      document.title = "React Concepts Explorer";
    };
  }, [count]);

  return (
    <section style={{ padding: "1rem", border: "1px solid #888", borderRadius: "0.75rem" }}>
      <h3>Hooks (React 16.8)</h3>
      <p>
        Hooks unify state, side effects, and memoisation in function components. They eliminated
        the need for most class components.
      </p>
      <button onClick={increment}>Increment: {count}</button>
      <p>Doubled value via useMemo: {doubled}</p>
      <p>Total renders counted with useRef: {renderCountRef.current}</p>
    </section>
  );
}
