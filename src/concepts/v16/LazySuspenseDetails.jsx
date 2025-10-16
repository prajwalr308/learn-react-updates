import React from "react";

export default function LazySuspenseDetails() {
  return (
    <article>
      <h4>Chunk Loaded!</h4>
      <p>
        Before React 16.6, implementing route-level code splitting typically required a custom
        higher-order component. React.lazy and Suspense standardised the approach and made it
        possible to share patterns across bundlers.
      </p>
    </article>
  );
}
