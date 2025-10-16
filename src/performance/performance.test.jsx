import { describe, expect, it, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import React from "react";
import ProfilerSurface from "./ProfilerSurface.jsx";
import ExpensiveList from "./ExpensiveList.jsx";

describe("Profiler-assisted performance tests", () => {
  it("filters without exceeding the target render duration", async () => {
    const reportSpy = vi.fn();

    render(
      <ProfilerSurface id="expensive-list" onReport={reportSpy}>
        <ExpensiveList />
      </ProfilerSurface>,
    );

    const input = screen.getByLabelText(/Filter list/i);
    fireEvent.change(input, { target: { value: "50" } });

    // Ensure the Profiler fired (React batches, so we flush microtasks).
    await Promise.resolve();

    expect(reportSpy).toHaveBeenCalled();
    const [payload] = reportSpy.mock.calls.slice(-1)[0];
    expect(payload.actualDuration).toBeLessThan(40);
  });
});
