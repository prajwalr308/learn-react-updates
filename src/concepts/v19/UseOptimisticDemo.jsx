import React from "react";

// useOptimistic (React 19) enables pending UI states that update instantly while an action runs.
// It pairs nicely with form actions but works independently as well.
export default function UseOptimisticDemo() {
  const [comments, setComments] = React.useState(["Love the new React 19 APIs!"]);

  const [optimisticComments, addComment] = React.useOptimistic(comments, (currentComments, pendingText) => [
    pendingText,
    ...currentComments,
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const text = formData.get("comment")?.toString();
    if (!text) return;

    // Update the optimistic state immediately, prior to the async "save".
    addComment(text);
    form.reset();

    // Fake a network call; after resolving we sync the server-confirmed state.
    await new Promise((resolve) => setTimeout(resolve, 500));
    setComments((previous) => [text, ...previous]);
  };

  return (
    <section style={{ padding: "1rem", border: "1px solid #d77a61", borderRadius: "0.75rem" }}>
      <h3>useOptimistic (React 19)</h3>
      <p>
        Pending comments show up instantly. The optimistic list reverts automatically if the action
        throws, so you can focus on the happy path.
      </p>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.5rem" }}>
        <label>
          Add comment:
          <input name="comment" placeholder="React 19 feels snappy!" />
        </label>
        <button type="submit">Post</button>
      </form>
      <ul>
        {optimisticComments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </section>
  );
}
