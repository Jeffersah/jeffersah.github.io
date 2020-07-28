import React, { useState, useEffect, useRef } from 'react';

// Shamelessly stolen from https://overreacted.io/making-setinterval-declarative-with-react-hooks/

export default function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef(() => { return; });

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
        savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}