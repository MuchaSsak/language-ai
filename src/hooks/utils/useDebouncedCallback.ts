import { debounce, hookLog } from "@/lib/utils";
import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type DebouncedCallbackOptions<TArgs extends any[]> = {
  delay?: number;
  maxWait?: number;
  fireImmediately?: boolean;
  trailing?: boolean;
  isProtective?: boolean;
  getCacheKey?: (...args: TArgs) => QueryKey;
  optimisticUpdate?: (
    queryClient: ReturnType<typeof useQueryClient>,
    cacheKey: QueryKey | undefined,
    ...args: TArgs
  ) => void;
};

export type DebouncedCallbackReturnHelpers = {
  handleCancelDebounces: () => void;
  handleFlushDebouncesImmediately: () => void;
  isDebouncing: boolean;
};

export default function useDebouncedCallback<
  T extends (...args: any[]) => void,
>(
  callback: T,
  options: DebouncedCallbackOptions<Parameters<T>> = {},
): [
  interceptedExecutor: (...args: Parameters<T>) => void,
  DebouncedCallbackReturnHelpers,
] {
  const {
    delay = 3000,
    maxWait = 3000,
    fireImmediately = false,
    trailing = true,
    isProtective = true,
    optimisticUpdate,
    getCacheKey,
  } = options;

  const queryClient = useQueryClient();
  const [isDebouncing, setIsDebouncing] = useState(false);

  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  const generationRef = useRef(0);
  const scheduledGenerationRef = useRef<number | null>(null);

  const debouncedFn = useMemo(() => {
    return debounce(
      (...args: Parameters<T>) => {
        if (scheduledGenerationRef.current !== generationRef.current) return;
        hookLog("useDebouncedCallback (complete)", callbackRef.current);
        callbackRef.current(...args);
      },
      delay,
      {
        maxWait,
        fireImmediately,
        trailing,
        isProtective,
        onStateChange: setIsDebouncing,
      },
    );
  }, [delay, maxWait, fireImmediately, trailing, isProtective]);

  const interceptedExecutor = useMemo(() => {
    return function interceptedExecutor(...args: Parameters<T>): void {
      scheduledGenerationRef.current = generationRef.current;

      // 1. Push raw args through the debouncer to get the PROTECTED state
      const mergedArgs = debouncedFn(...args);

      // 2. Use the MERGED state for cache keys and optimistic updates
      const cacheKey = getCacheKey ? getCacheKey(...mergedArgs) : undefined;
      if (cacheKey) queryClient.cancelQueries({ queryKey: cacheKey });
      if (optimisticUpdate)
        optimisticUpdate(queryClient, cacheKey, ...mergedArgs);
    };
  }, [debouncedFn, optimisticUpdate, getCacheKey, queryClient]);

  const handleCancelDebounces = useCallback(() => {
    hookLog("useDebouncedCallback (cancel)", undefined);

    generationRef.current += 1;
    scheduledGenerationRef.current = null;
    debouncedFn.cancel();
  }, [debouncedFn]);

  const handleFlushDebouncesImmediately = useCallback(() => {
    hookLog("useDebouncedCallback (flush immediately)", undefined);

    debouncedFn.flush();
  }, [debouncedFn]);

  useEffect(() => {
    return () => {
      debouncedFn.flush();
      generationRef.current += 1;
      scheduledGenerationRef.current = null;
      debouncedFn.cancel();
    };
  }, [debouncedFn]);

  return [
    interceptedExecutor,
    {
      isDebouncing,
      handleCancelDebounces,
      handleFlushDebouncesImmediately,
    },
  ];
}
