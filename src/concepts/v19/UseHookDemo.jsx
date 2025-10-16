import React from "react";

// The new `use` hook (React 19) unwraps promises, context, and async iterables straight from the
// render phase. Coupled with Suspense, it simplifies data fetching immensely.
const factPromise = (() => {
  let cache;
  return () => {
    if (!cache) {
      cache = new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            "React 19 delivers the new `use` hook so Suspense-friendly data fetching feels natural.",
          );
        }, 650);
      });
    }
    return cache;
  };
})();

export default function UseHookDemo() {
  // The promise is read during render, letting React handle the suspension automatically.
  const fact = React.use(factPromise());

  return (
    <section style={{ padding: "1rem", border: "1px solid #374785", borderRadius: "0.75rem" }}>
      <h3>use() Data Fetching (React 19)</h3>
      <p>
        With Suspense boundaries, the <code>use</code> hook removes the need for local loading
        state. React pauses rendering until the promise resolves.
      </p>
      <blockquote>{fact}</blockquote>
    </section>
  );
}
