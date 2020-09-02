import React, { useEffect, useRef } from 'react';

export default function useCanvas(repaint: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void, repaintOn?: React.DependencyList): React.MutableRefObject<HTMLCanvasElement> {
  const canvasRef = useRef<HTMLCanvasElement>(undefined);
  useEffect(() => {
    if (canvasRef.current !== undefined) {
      const ctx = canvasRef.current.getContext('2d');
      repaint(canvasRef.current, ctx);
    }
  }, repaintOn);
  return canvasRef;
}