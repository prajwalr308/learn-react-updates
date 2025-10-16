import React from "react";
import ModernContextDemo from "./concepts/v16/ModernContextDemo.jsx";
import HooksDemo from "./concepts/v16/HooksDemo.jsx";
import ErrorBoundaryDemo from "./concepts/v16/ErrorBoundaryDemo.jsx";
import LazySuspenseDemo from "./concepts/v16/LazySuspenseDemo.jsx";
import EventDelegationDemo from "./concepts/v17/EventDelegationDemo.jsx";
import JSXTransformDemo from "./concepts/v17/JSXTransformDemo.jsx";
import TransitionDemo from "./concepts/v18/TransitionDemo.jsx";
import DeferredValueDemo from "./concepts/v18/DeferredValueDemo.jsx";
import AutomaticBatchingDemo from "./concepts/v18/AutomaticBatchingDemo.jsx";
import FormActionsDemo from "./concepts/v19/FormActionsDemo.jsx";
import UseOptimisticDemo from "./concepts/v19/UseOptimisticDemo.jsx";
import UseHookDemo from "./concepts/v19/UseHookDemo.jsx";
import ProfilerSurface from "./performance/ProfilerSurface.jsx";
import ExpensiveList from "./performance/ExpensiveList.jsx";

// The sections array drives the navigation UI so we can easily add demos for future releases.
const SECTIONS = [
  {
    version: "16.x Era",
    summary:
      "Hooks, Suspense, the modern context API, and error boundaries arrived shortly after React 16.",
    demos: [
      { title: "Modern Context API", Component: ModernContextDemo },
      { title: "Hooks Overview", Component: HooksDemo },
      { title: "Error Boundaries", Component: ErrorBoundaryDemo },
      { title: "React.lazy & Suspense", Component: LazySuspenseDemo },
    ],
  },
  {
    version: "17.x Notes",
    summary:
      "React 17 focused on upgradeability: the new event system and JSX transform reduced migration friction.",
    demos: [
      { title: "Event Delegation Upgrade", Component: EventDelegationDemo },
      { title: "JSX Transform Improvements", Component: JSXTransformDemo },
    ],
  },
  {
    version: "18.x Features",
    summary:
      "Concurrent rendering made it to stable with useTransition, useDeferredValue, and broader batching.",
    demos: [
      { title: "useTransition", Component: TransitionDemo },
      { title: "useDeferredValue", Component: DeferredValueDemo },
      { title: "Automatic Batching", Component: AutomaticBatchingDemo },
    ],
  },
  {
    version: "19 RC Highlights",
    summary:
      "Actions, optimistic updates, and the new use() hook modernise form handling and Suspense-first data.",
    demos: [
      { title: "Form Actions", Component: FormActionsDemo },
      { title: "useOptimistic", Component: UseOptimisticDemo },
      {
        title: "use() with Suspense",
        Component: function UseHookSuspenseWrapper() {
          return (
            <React.Suspense fallback={<p>Loading data via the new use() hook…</p>}>
              <UseHookDemo />
            </React.Suspense>
          );
        },
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

        {activeSection.demos.map(({ title, Component }) => (
          <article key={title} style={styles.demoCard}>
            <Component />
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
        </article>
      </main>
    </div>
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
};
