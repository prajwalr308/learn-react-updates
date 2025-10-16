import React from "react";
import { useFormStatus } from "react-dom";

// React 19 introduces Actions and related hooks (`useActionState`, `useFormStatus`) to make form
// submissions ergonomic in both client and server components. The demo keeps everything client-side
// while calling an async function to mimic a server mutation.
async function fakeServerAction(previousState, formData) {
  // Simulate latency so we can observe the pending states driven by the new hooks.
  await new Promise((resolve) => setTimeout(resolve, 600));

  const nextName = formData.get("name")?.trim();

  if (!nextName) {
    // Returning a plain object becomes the next action state — perfect for validation errors.
    return { status: "error", message: "Please share your name before submitting." };
  }

  return { status: "success", message: `Welcome aboard, ${nextName}!` };
}

function FormStatusNote() {
  // useFormStatus must live within a descendant of the form to access its state.
  const { pending, data } = useFormStatus();
  return (
    <p>
      Form status via useFormStatus: {pending ? "Pending" : "Idle"}
      {data?.get ? ` • Last payload: ${data.get("name") || "—"}` : null}
    </p>
  );
}

export default function FormActionsDemo() {
  // useActionState wires the action result directly into component state, no manual dispatching.
  const [state, submit, isPending] = React.useActionState(fakeServerAction, {
    status: "idle",
    message: "Submit the form to observe the new flow.",
  });

  return (
    <section style={{ padding: "1rem", border: "1px solid #4a8fe7", borderRadius: "0.75rem" }}>
      <h3>Form Actions & useActionState (React 19)</h3>
      <p>
        Actions simplify form submissions by handling state, optimistic updates, and errors without
        extra reducers or effect plumbing.
      </p>
      <form action={submit} style={{ display: "grid", gap: "0.5rem", maxWidth: "20rem" }}>
        <label>
          Name:
          <input name="name" placeholder="Grace Hopper" />
        </label>
        <button type="submit" disabled={isPending}>
          {isPending ? "Saving…" : "Submit"}
        </button>
        <FormStatusNote />
      </form>
      <p>
        Latest result: <strong>{state.status}</strong> — {state.message}
      </p>
    </section>
  );
}
