## React Concepts Explorer (16.x → 19)

This sample project highlights the most influential React features that arrived after version 16, all the way through the upcoming 19 release candidate. Each folder under `src/concepts` focuses on a specific release and contains heavily commented components that demonstrate how, when, and why to apply the feature. The `src/performance` directory shows practical strategies for profiling, testing, and optimizing React applications.

### Quick Start

```bash
npm install
npm run dev
```

> **Note:** React 19 is currently in release-candidate form. The examples under `src/concepts/v19` rely on APIs that ship with `react@19` canary/RC builds. See the inline comments for migration guidance when working with stable React 18 apps.

### Directory Guide

- `src/concepts/v16` – Modern context API, suspense/lazy loading, error boundaries, and the Profiler (all introduced after React 16.3).
- `src/concepts/v17` – Upgrade notes for React 17’s event system refinements with example migration-safe code.
- `src/concepts/v18` – Concurrent rendering primitives such as `startTransition`, `useTransition`, and `useDeferredValue`.
- `src/concepts/v19` – Form Actions, `useOptimistic`, the new `use` hook, and asset loading metadata.
- `src/performance` – Utilities that wrap React’s Profiler, browser performance marks, and a demonstration test that tracks render timings.

Each component is designed to be copy-paste ready, with comments that explain the rationale and trade-offs. Start at `src/App.jsx` to browse the demos inside the running app.

### Performance Playbook

1. Inspect render timings with `React.Profiler` (`src/performance/ProfilerSurface.jsx`).
2. Pin down expensive child renders by wrapping them in `React.memo` and pairing with `useCallback` or `useMemo`.
3. Use the sample test in `src/performance/performance.test.jsx` to keep optimizations from regressing.
4. Combine the browser’s `performance.mark`/`measure` API with React’s scheduler to capture user-perceived latency.

Happy exploring!
