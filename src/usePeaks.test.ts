import { renderHook, act } from "@testing-library/react";
import { useCustomHook } from "./usePeaks";

test("should be loading", () => {
  const { result } = renderHook(() => useCustomHook());

  act(() => {});

  expect(result.current.loading).toBe(true);
});
