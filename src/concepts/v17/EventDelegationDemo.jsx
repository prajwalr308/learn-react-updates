import React from "react";

// React 17 shipped a major change to the event delegation system, moving from document-level
// listeners to the root container. This makes it easier to embed React into existing apps without
// hijacking global event handlers. The functional difference is subtle, so the example focuses on
// showing how we can interoperate with non-React DOM listeners.
export default function EventDelegationDemo() {
  const containerRef = React.useRef(null);
  const [nativeClicks, setNativeClicks] = React.useState(0);
  const [reactClicks, setReactClicks] = React.useState(0);

  React.useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    // Adding a native listener alongside React's synthetic events now works without capturing
    // conflicts thanks to the root-level delegation change in React 17.
    const handleNativeClick = () => setNativeClicks((n) => n + 1);
    node.addEventListener("click", handleNativeClick);

    return () => node.removeEventListener("click", handleNativeClick);
  }, []);

  return (
    <section
      ref={containerRef}
      style={{ padding: "1rem", border: "1px solid #cc7722", borderRadius: "0.75rem" }}
    >
      <h3>Event System Upgrades (React 17)</h3>
      <p>
        React now delegates events to the root instead of <code>document</code>, so third-party
        widgets that attach global listeners play nicely with React components.
      </p>
      <button onClick={() => setReactClicks((n) => n + 1)}>
        Click me (React synthetic events: {reactClicks}, native events: {nativeClicks})
      </button>
    </section>
  );
}
