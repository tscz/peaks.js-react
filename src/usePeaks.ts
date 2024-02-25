import Peaks, { PeaksInstance, PeaksOptions } from "peaks.js";
import { useState, useEffect, useMemo } from "react";

interface PeaksHookResult {
  peaks: PeaksInstance | undefined;
  loading: boolean;
  error: Error | undefined;
}

export function usePeaks({
  audioRef,
  waveformRef,
  options = {},
}: {
  audioRef: React.RefObject<HTMLAudioElement>;
  waveformRef: React.RefObject<HTMLDivElement>;
  options?: PeaksOptions;
}): PeaksHookResult {
  const [peaks, setPeaks] = useState<PeaksInstance>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error>();
  const memoizedOptions = useMemo(() => options, [JSON.stringify(options)]);

  useEffect(() => {
    setLoading(true);

    if (!audioRef.current) {
      setError(new Error("no audio ref"));
      setLoading(false);
      return;
    }
    if (!waveformRef.current) {
      setError(new Error("no waveform ref"));
      setLoading(false);
      return;
    }

    if (audioRef.current && waveformRef.current) {
      const peaksOptions: PeaksOptions = {
        overview: { container: waveformRef.current },
        mediaElement: audioRef.current,
        ...memoizedOptions,
      };

      Peaks.init(peaksOptions, (error, peaks) => {
        if (error) setError(error);
        if (peaks) setPeaks(peaks);
        setLoading(false);
      });
    }

    // Clean up on unmount
    return () => {
      peaks?.destroy();
    };
  }, [memoizedOptions]);

  return { peaks, loading, error };
}
