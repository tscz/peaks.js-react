import { renderHook } from "@testing-library/react";
import { usePeaks } from "./usePeaks";
import { useRef } from "react";

test("should set the error if the audio ref is undefined", () => {
  const { result } = renderHook(() => {
    return usePeaks({});
  });

  expect(result.current.loading).toBe(false);
  expect(result.current.error).toStrictEqual(new Error("no audio ref"));
});
