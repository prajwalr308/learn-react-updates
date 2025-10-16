import React from "react";

// React 17 introduced the new JSX transform, letting us compile JSX without importing React in
// every file. Vite already configures this automatically, but the example below demonstrates how
// you can still opt into explicit imports when you want the clarity.
export default function JSXTransformDemo() {
  const [text, setText] = React.useState("");

  return (
    <section
      style={{
        padding: "1rem",
        border: "1px solid #629460",
        borderRadius: "0.75rem",
      }}
    >
      <h3>New JSX Transform (React 17)</h3>
      <p>
        Build tools can compile JSX to <code>jsx</code>/<code>jsxs</code> helper
        calls, so React does not need to stay in scope. The upgrade removes
        boilerplate and improves bundle size.
      </p>
      <label>
        Type anything:
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          style={{ marginLeft: "0.5rem" }}
        />
      </label>
      <p>
        The state updates automatically thanks to the JSX transform’s cleaner
        runtime helpers.
      </p>
    </section>
  );
}
