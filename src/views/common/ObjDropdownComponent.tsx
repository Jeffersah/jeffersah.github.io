import * as React from 'react';
import Dropdown from 'react-dropdown';

export function ObjDropdownComponent<T>(props: {options: T[], getName: (item:T) => string, value: T, onChange: (item:T)=>void}) {
    const names = props.options.map(props.getName);
    return <Dropdown options={names} value={props.getName(props.value)} onChange={chng => props.onChange(props.options.find(v => props.getName(v) === chng.value))}></Dropdown>
}