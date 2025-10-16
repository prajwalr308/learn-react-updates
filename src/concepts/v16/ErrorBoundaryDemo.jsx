import React from "react";

// Error boundaries were formalized in React 16 and immediately became a staple for
// guarding entire UI regions. They catch errors in render/commit phases of child
// components and prevent the entire app from crashing.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    // A simple piece of state toggles the fallback on once an error is captured.
    this.state = { hasError: false, error: null };
  }

  // getDerivedStateFromError lets us update the state in reaction to the failure.
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // componentDidCatch is ideal for side effects like logging.
  componentDidCatch(error, info) {
    console.error("Captured by ErrorBoundary", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section style={{ border: "1px solid crimson", padding: "1rem", borderRadius: "0.75rem" }}>
          <h3>Error Boundary Fallback</h3>
          <p>
            React 16 introduced error boundaries so a broken widget does not blank out the entire
            application.
          </p>
          <pre style={{ whiteSpace: "pre-wrap" }}>{String(this.state.error)}</pre>
        </section>
      );
    }

    return this.props.children;
  }
}

// This component intentionally throws when a button is pressed so we can observe the boundary in action.
function FlakyWidget() {
  const [shouldExplode, setShouldExplode] = React.useState(false);

  if (shouldExplode) {
    throw new Error("Simulated crash after React 16's error boundary support");
  }

  return (
    <div>
      <p>Trigger an error to see the boundary catch it gracefully.</p>
      <button onClick={() => setShouldExplode(true)}>Cause a crash</button>
    </div>
  );
}

export default function ErrorBoundaryDemo() {
  return (
    <ErrorBoundary>
      {/* Wrapping a single widget keeps the blast radius contained. */}
      <FlakyWidget />
    </ErrorBoundary>
  );
}
