import { useState } from 'react';

// Same as useState, but with a change handler that fires before the state is updated
export default function useUpdateState<T>(initial: T, beforeChange: (newValue: T, oldValue?: T) => void): [T, (item: T) => void] {
  const [value, updateValue] = useState(initial);
  return [value, (newValue: T) => { beforeChange(newValue, value); updateValue(newValue); }];
}