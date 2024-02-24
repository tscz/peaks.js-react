import { useState, useEffect } from "react";

interface CustomHookResult {
  data: string;
  loading: boolean;
  error: Error | null;
}

export function useCustomHook(): CustomHookResult {
  const [data, setData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate an async operation
    setTimeout(() => {
      setLoading(false);
      setData("Hello from custom hook!");
    }, 2000);
  }, []);

  return { data, loading, error };
}
