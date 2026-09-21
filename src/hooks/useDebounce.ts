import { useMemo, useEffect, useRef } from 'react';
import debounce from 'lodash/debounce';

export const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
  const ref = useRef(callback);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  return useMemo(() => debounce((...args) => ref.current(...args), delay), [delay]);
};