import { renderHook, act } from "@testing-library/react";
import { usePeaks } from "./usePeaks";
import { useRef } from "react";

test("should set the error if the audio ref is undefined", () => {
  const { result } = renderHook(() => {
    const waveformRef = useRef(document.createElement("div"));

    return usePeaks({
      audioRef: { current: null },
      waveformRef,
    });
  });

  expect(result.current.loading).toBe(false);
  expect(result.current.error).toStrictEqual(new Error("no audio ref"));
});

test("should set the error if the waveform ref is undefined", () => {
  const { result } = renderHook(() => {
    const audioRef = useRef(document.createElement("audio"));

    return usePeaks({
      audioRef,
      waveformRef: { current: null },
    });
  });

  expect(result.current.loading).toBe(false);
  expect(result.current.error).toStrictEqual(new Error("no waveform ref"));
});
