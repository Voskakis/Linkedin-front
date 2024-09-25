import { useEffect, useRef } from 'react';

export const useAfterRender = (callback: () => void) => {
  const hasRenderedRef = useRef(false);

  useEffect(() => {
    if (hasRenderedRef.current) {
      // Run the callback after render
      callback();
    } else {
      // Set to true after the initial render
      hasRenderedRef.current = true;
    }
  });
};
