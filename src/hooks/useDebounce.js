import { useState, useEffect } from 'react';

/**
 * Delays updating a value until a specified timeout threshold passes.
 * @param {any} value - The input value tracking active mutations.
 * @param {number} delay - Time delay parameter threshold in milliseconds.
 * @returns {any} The debounced stable value output state.
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timer to update the stable value after the delay window closes
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: Clear the timer if the value shifts before the threshold completes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
