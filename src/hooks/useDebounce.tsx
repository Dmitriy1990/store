import { useRef, useEffect, useState } from 'react';

export default function useDebounce<T>(value: T, delay: number): T {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}

// import { useRef, useEffect } from 'react';

// export default function useDebouncedFunction(
//   func: (...args: any) => void,
//   delay: number,
//   cleanUp = false
// ) {
//   const timeoutRef = useRef<any>();

//   // Очистка таймера
//   function clearTimer() {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//       timeoutRef.current = undefined;
//     }
//   }

//   // Очищаем таймер при анмаунте компонента, если cleanUp выставлен в true
//   // и тем самым отменяем последний запланированный вызов
//   useEffect(() => (cleanUp ? clearTimer : undefined), [cleanUp]);

//   return (...args: any) => {
//     clearTimer();
//     timeoutRef.current = setTimeout(() => func(...args), delay);
//   };
// }
