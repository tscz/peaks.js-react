import Peaks, { PeaksInstance, PeaksOptions } from "peaks.js";
import { useState, useEffect } from "react";

interface PeaksHookResult {
  peaks: PeaksInstance | undefined;
  loading: boolean;
  error: Error | null;
}

export function usePeaks({
  audioRef,
  waveformRef,
  options,
}: {
  audioRef: React.RefObject<HTMLAudioElement>;
  waveformRef: React.RefObject<HTMLDivElement>;
  options?: PeaksOptions;
}): PeaksHookResult {
  const [peaks, setPeaks] = useState<PeaksInstance>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

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
        ...options,
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
  }, [audioRef.current, waveformRef.current, options]);

  return { peaks, loading, error };
}
