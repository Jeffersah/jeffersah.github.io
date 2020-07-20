export default interface IMechComponent {
    name: string;
    description: string;
    getCustomComponent?: (props: IMechCustomComponentProps) => JSX.Element;
    onSelect?: (props: IMechCustomComponentProps) => void;
    onDeselect?: (props: IMechCustomComponentProps) => void;
}

export interface IMechCustomComponentProps {
    addComponentBonus: (delta: { component: 'head'|'body'|'rarm'|'larm'|'rhand'|'lhand'|'rleg'|'lleg', hp?: number, armor?: number, permArmor?: number }) => void;
}