import React from "react";

// Create a context instance with an explicit default to highlight the new Context API
// that arrived in React 16.3. The legacy context API used childContextTypes, which
// was both unsafe and awkward. The modern API is fully typed and supports updates.
const ThemeContext = React.createContext({
  mode: "light",
  toggleMode: () => {},
});

// The provider component demonstrates how context values can now be updated without
// relying on element context or legacy lifecycle methods.
function ThemeProvider({ children }) {
  const [mode, setMode] = React.useState("light");

  // useCallback keeps the function reference stable so consumers avoid re-renders.
  const toggleMode = React.useCallback(() => {
    setMode((current) => (current === "light" ? "dark" : "light"));
  }, []);

  // The provider shares both state and actions, which was painful to do before 16.3.
  const value = React.useMemo(() => ({ mode, toggleMode }), [mode, toggleMode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// A consumer component shows the ergonomics of useContext versus contextType or
// <Consumer> render props that were commonly used pre-React 16.8.
function ThemeControls() {
  const { mode, toggleMode } = React.useContext(ThemeContext);

  return (
    <section
      style={{
        padding: "1rem",
        borderRadius: "0.75rem",
        border: "1px solid var(--border-color, #444)",
        background: mode === "light" ? "#f4f4f4" : "#222",
        color: mode === "light" ? "#222" : "#f4f4f4",
      }}
    >
      <h3>Modern Context API (React 16.3)</h3>
      <p>
        The new provider/consumer API keeps context updates predictable and fully compatible with hooks.
      </p>
      <button onClick={toggleMode}>
        Toggle theme (current mode: <strong>{mode}</strong>)
      </button>
    </section>
  );
}

export default function ModernContextDemo() {
  return (
    <ThemeProvider>
      {/* By wrapping our demo with the provider we can flip between themes without prop drilling. */}
      <ThemeControls />
    </ThemeProvider>
  );
}
