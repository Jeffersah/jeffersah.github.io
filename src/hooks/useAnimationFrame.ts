import React, { useState, useEffect, useRef } from 'react';

// Based on code stolen from https://overreacted.io/making-setinterval-declarative-with-react-hooks/

export default function useAnimationFrame(callback: () => void) {
  const savedCallback = useRef(() => { return; });
  const animationFrame = useRef(0);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the repeater.
  useEffect(() => {
    function tick() {
        savedCallback.current();
        animationFrame.current = requestAnimationFrame(tick);
    }
    animationFrame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame.current);
  }, []);
}