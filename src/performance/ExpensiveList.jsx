import React from "react";

// This list intentionally performs extra work so we can benchmark improvements.
const generateData = (count) =>
  Array.from({ length: count }, (_, index) => `Result ${index.toString().padStart(4, "0")}`);

const ExpensiveListItem = React.memo(function ExpensiveListItem({ item }) {
  // Heavy computation fakes CPU work; memoisation ensures we only pay the cost when props change.
  let total = 0;
  for (let index = 0; index < 3000; index += 1) {
    total += Math.sqrt(index);
  }
  return (
    <li>
      {item} • checksum {total.toFixed(2)}
    </li>
  );
});

export default function ExpensiveList() {
  const [items] = React.useState(() => generateData(100));
  const [filter, setFilter] = React.useState("");

  // useDeferredValue keeps the filtered list from blocking while the user types quickly.
  const deferredFilter = React.useDeferredValue(filter);

  const visibleItems = React.useMemo(() => {
    return items.filter((item) => item.toLowerCase().includes(deferredFilter.toLowerCase()));
  }, [items, deferredFilter]);

  const handleFilterChange = React.useCallback((event) => setFilter(event.target.value), []);

  return (
    <section style={{ padding: "1rem", border: "1px solid #333", borderRadius: "0.75rem" }}>
      <h3>Profiling Expensive Lists</h3>
      <p>
        React.memo, useCallback, and useDeferredValue reduce unnecessary renders. Pair this
        component with ProfilerSurface to log timing data.
      </p>
      <label>
        Filter list:
        <input value={filter} onChange={handleFilterChange} style={{ marginLeft: "0.5rem" }} />
      </label>
      <ul>
        {visibleItems.map((item) => (
          <ExpensiveListItem key={item} item={item} />
        ))}
      </ul>
    </section>
  );
}
