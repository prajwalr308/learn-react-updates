import React from "react";
import ModernContextDemo from "./concepts/v16/ModernContextDemo.jsx";
import ModernContextDemoSource from "./concepts/v16/ModernContextDemo.jsx?raw";
import HooksDemo from "./concepts/v16/HooksDemo.jsx";
import HooksDemoSource from "./concepts/v16/HooksDemo.jsx?raw";
import ErrorBoundaryDemo from "./concepts/v16/ErrorBoundaryDemo.jsx";
import ErrorBoundaryDemoSource from "./concepts/v16/ErrorBoundaryDemo.jsx?raw";
import LazySuspenseDemo from "./concepts/v16/LazySuspenseDemo.jsx";
import LazySuspenseDemoSource from "./concepts/v16/LazySuspenseDemo.jsx?raw";
import EventDelegationDemo from "./concepts/v17/EventDelegationDemo.jsx";
import EventDelegationDemoSource from "./concepts/v17/EventDelegationDemo.jsx?raw";
import JSXTransformDemo from "./concepts/v17/JSXTransformDemo.jsx";
import JSXTransformDemoSource from "./concepts/v17/JSXTransformDemo.jsx?raw";
import TransitionDemo from "./concepts/v18/TransitionDemo.jsx";
import TransitionDemoSource from "./concepts/v18/TransitionDemo.jsx?raw";
import DeferredValueDemo from "./concepts/v18/DeferredValueDemo.jsx";
import DeferredValueDemoSource from "./concepts/v18/DeferredValueDemo.jsx?raw";
import AutomaticBatchingDemo from "./concepts/v18/AutomaticBatchingDemo.jsx";
import AutomaticBatchingDemoSource from "./concepts/v18/AutomaticBatchingDemo.jsx?raw";
import FormActionsDemo from "./concepts/v19/FormActionsDemo.jsx";
import FormActionsDemoSource from "./concepts/v19/FormActionsDemo.jsx?raw";
import UseOptimisticDemo from "./concepts/v19/UseOptimisticDemo.jsx";
import UseOptimisticDemoSource from "./concepts/v19/UseOptimisticDemo.jsx?raw";
import UseHookDemo from "./concepts/v19/UseHookDemo.jsx";
import UseHookDemoSource from "./concepts/v19/UseHookDemo.jsx?raw";
import { Highlight, themes } from "prism-react-renderer";
import ProfilerSurface from "./performance/ProfilerSurface.jsx";
import ExpensiveList from "./performance/ExpensiveList.jsx";
import ExpensiveListSource from "./performance/ExpensiveList.jsx?raw";

// The sections array drives the navigation UI so we can easily add demos for future releases.
const SECTIONS = [
  {
    version: "16.x Era",
    summary:
      "Hooks, Suspense, the modern context API, and error boundaries arrived shortly after React 16.",
    demos: [
      { title: "Modern Context API", Component: ModernContextDemo, source: ModernContextDemoSource },
      { title: "Hooks Overview", Component: HooksDemo, source: HooksDemoSource },
      { title: "Error Boundaries", Component: ErrorBoundaryDemo, source: ErrorBoundaryDemoSource },
      { title: "React.lazy & Suspense", Component: LazySuspenseDemo, source: LazySuspenseDemoSource },
    ],
  },
  {
    version: "17.x Notes",
    summary:
      "React 17 focused on upgradeability: the new event system and JSX transform reduced migration friction.",
    demos: [
      {
        title: "Event Delegation Upgrade",
        Component: EventDelegationDemo,
        source: EventDelegationDemoSource,
      },
      { title: "JSX Transform Improvements", Component: JSXTransformDemo, source: JSXTransformDemoSource },
    ],
  },
  {
    version: "18.x Features",
    summary:
      "Concurrent rendering made it to stable with useTransition, useDeferredValue, and broader batching.",
    demos: [
      { title: "useTransition", Component: TransitionDemo, source: TransitionDemoSource },
      { title: "useDeferredValue", Component: DeferredValueDemo, source: DeferredValueDemoSource },
      { title: "Automatic Batching", Component: AutomaticBatchingDemo, source: AutomaticBatchingDemoSource },
    ],
  },
  {
    version: "19 RC Highlights",
    summary:
      "Actions, optimistic updates, and the new use() hook modernise form handling and Suspense-first data.",
    demos: [
      { title: "Form Actions", Component: FormActionsDemo, source: FormActionsDemoSource },
      { title: "useOptimistic", Component: UseOptimisticDemo, source: UseOptimisticDemoSource },
      {
        title: "use() with Suspense",
        Component: function UseHookSuspenseWrapper() {
          return (
            <React.Suspense fallback={<p>Loading data via the new use() hook…</p>}>
              <UseHookDemo />
            </React.Suspense>
          );
        },
        source: UseHookDemoSource,
      },
    ],
  },
];

export default function App() {
  // Navigate between release eras to keep the UI digestible.
  const [activeIndex, setActiveIndex] = React.useState(0);
  const activeSection = SECTIONS[activeIndex];

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1>React Concepts Explorer</h1>
        <p>
          A tour through React’s major releases starting after 16, with inline commentary and
          performance tooling.
        </p>
      </header>

      <nav style={styles.nav}>
        {SECTIONS.map((section, index) => (
          <button
            key={section.version}
            onClick={() => setActiveIndex(index)}
            style={{
              ...styles.navButton,
              ...(index === activeIndex ? styles.navButtonActive : null),
            }}
          >
            {section.version}
          </button>
        ))}
      </nav>

      <main style={styles.content}>
        <section style={styles.sectionSummary}>
          <h2>{activeSection.version}</h2>
          <p>{activeSection.summary}</p>
        </section>

        {activeSection.demos.map(({ title, Component, source }) => (
          <article key={title} style={styles.demoCard}>
            <Component />
            {source ? <CodeSnippet code={source} /> : null}
          </article>
        ))}

        <article style={styles.demoCard}>
          <h2>Performance Toolkit</h2>
          <p>
            The Profiler landed in React 16.9 and keeps getting smarter. Wrap heavy components in the
            helper below to log render timings to the console.
          </p>
          <ProfilerSurface id="concept-expensive-list">
            <ExpensiveList />
          </ProfilerSurface>
          <CodeSnippet code={ExpensiveListSource} />
        </article>
      </main>
    </div>
  );
}

function CodeSnippet({ code }) {
  const trimmed = code.trim();
  return (
    <details style={styles.codeDetails}>
      <summary style={styles.codeSummary}>View source</summary>
      <Highlight code={trimmed} language="jsx" theme={themes.nightOwl}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={{ ...styles.codeBlock, ...style }}>
            {tokens.map((line, lineIndex) => (
              <div key={lineIndex} {...getLineProps({ line })}>
                {line.map((token, tokenIndex) => (
                  <span key={tokenIndex} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </details>
  );
}

// Inline styles keep the sample self-contained. In real projects you would likely extract them or
// use a CSS-in-JS solution.
const styles = {
  page: {
    fontFamily: "system-ui, sans-serif",
    padding: "1.5rem",
    display: "grid",
    gap: "1.5rem",
    background: "#0b172a",
    minHeight: "100vh",
    color: "#f4f7ff",
  },
  header: {
    display: "grid",
    gap: "0.5rem",
  },
  nav: {
    display: "flex",
    gap: "0.75rem",
    flexWrap: "wrap",
  },
  navButton: {
    padding: "0.5rem 1rem",
    borderRadius: "999px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "rgba(255, 255, 255, 0.3)",
    background: "transparent",
    color: "inherit",
    cursor: "pointer",
  },
  navButtonActive: {
    background: "#1d3557",
    borderColor: "#a8dadc",
  },
  content: {
    display: "grid",
    gap: "1rem",
  },
  sectionSummary: {
    background: "rgba(24, 40, 72, 0.85)",
    borderRadius: "1rem",
    padding: "1rem",
  },
  demoCard: {
    background: "rgba(13, 27, 42, 0.9)",
    borderRadius: "1rem",
    padding: "1rem",
    border: "1px solid rgba(255, 255, 255, 0.08)",
  },
  codeDetails: {
    marginTop: "1rem",
    padding: "0.75rem",
    borderRadius: "0.75rem",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    background: "rgba(9, 20, 35, 0.9)",
  },
  codeSummary: {
    cursor: "pointer",
    fontWeight: 600,
    color: "#a8dadc",
  },
  codeBlock: {
    margin: "0.75rem 0 0",
    background: "rgba(5, 12, 24, 0.9)",
    borderRadius: "0.5rem",
    padding: "0.75rem",
    whiteSpace: "pre",
    overflowX: "auto",
    fontFamily:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    fontSize: "0.85rem",
    lineHeight: 1.6,
  },
};
