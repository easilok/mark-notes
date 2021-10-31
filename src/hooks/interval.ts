import { useEffect, useRef } from 'react';

export function useInterval(callback: () => void, delay: number | null): void {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const savedCallback = useRef(() => { });

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    console.log('Set Interval');
    const tick = () => {
      return savedCallback.current();
    };
    if (delay) {
      const id = setInterval(tick, delay);

      return () => clearInterval(id);
    }
  }, [delay]);
}
