import React from "react";

// React.lazy and Suspense (16.6) made it dramatically easier to code-split components.
// Instead of wiring up a bundler-specific API we can load components only when needed.
const LazyDetails = React.lazy(async () => {
  // The dynamic import can be any module; here we simulate latency with a timeout.
  await new Promise((resolve) => setTimeout(resolve, 800));
  return import("./LazySuspenseDetails.jsx");
});

export default function LazySuspenseDemo() {
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <section style={{ padding: "1rem", border: "1px solid #2266cc", borderRadius: "0.75rem" }}>
      <h3>Code Splitting with React.lazy (React 16.6)</h3>
      <p>
        Clicking the button toggles a lazily loaded component. Suspense takes care of displaying a
        fallback while the bundle chunk arrives.
      </p>
      <button onClick={() => setShowDetails((current) => !current)}>
        {showDetails ? "Hide" : "Show"} lazily loaded details
      </button>

      {/* Suspense waits for the LazyDetails promise to settle and renders the fallback meanwhile. */}
      <React.Suspense fallback={<p>Loading lazily imported UI…</p>}>
        {showDetails ? <LazyDetails /> : null}
      </React.Suspense>
    </section>
  );
}
