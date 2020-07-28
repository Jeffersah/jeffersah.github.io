import useInterval from '../../../hooks/useInterval';
import useAnimationFrame from '../../../hooks/useAnimationFrame';
import { useEffect, useRef } from 'react';

const MAX_DELAY_TIME = 3000;
const MIN_DELAY_BEFORE_FRAMES = 60;

export default function useAutoplayHook(callback: () => void, enable: boolean, speed: number) {
    const savedCallback = useRef(() => { return; });
    const waitId = useRef<number | NodeJS.Timeout>(0);
    const waitIdIsAnimationFrame = useRef(false);

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the repeater.
    useEffect(() => {
        function tick() {
            savedCallback.current();
            triggerTick();
        }

        function triggerTick() {
            if (speed <= 0.5) {
                const frameRange = MAX_DELAY_TIME - MIN_DELAY_BEFORE_FRAMES;
                const sleepPercent = 1 - (speed * 2);
                const sleepTime = Math.floor(frameRange * sleepPercent) + MIN_DELAY_BEFORE_FRAMES;
                waitId.current = setTimeout(tick, sleepTime);
                waitIdIsAnimationFrame.current = false;
            }
            else  {
                waitId.current = requestAnimationFrame(tick);
                waitIdIsAnimationFrame.current = true;
            }
        }

        if (enable) triggerTick();
        return () => {
            if  (waitIdIsAnimationFrame.current) {
                cancelAnimationFrame(waitId.current as number);
            } else {
                clearTimeout(waitId.current as NodeJS.Timeout);
            }
        };
    }, [enable, speed]);
}