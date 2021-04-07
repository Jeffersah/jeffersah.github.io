import * as React from "react"
import descriptorTree, { IDescriptorTree } from "../../../projects/sortVis/sortDescriptors";
import ISortDescriptor from "../../../projects/sortVis/sortDescriptors/ISortDescriptor";
import ISort from "../../../projects/sortVis/sorts/ISort";

export default function SortVisTreeListComponent(props: { children: JSX.Element, sortChosen: (algo: ISort)=>void }) {
    const [expanded, setExpanded] = React.useState<boolean>(true);
    const [selectedDescriptor, setDescriptor] = React.useState<ISortDescriptor | null>(null);

    React.useEffect(() => {
        if(selectedDescriptor !== null && selectedDescriptor.algorithm !== null) {
            props.sortChosen(selectedDescriptor.algorithm);
        }
    }, [selectedDescriptor]);

    if(!expanded) {
        return <div>
            <button style={{width: 34, height: 18, padding: 0, margin: 0, float:'left' }} onClick={() => setExpanded(true)}>&gt;&gt;</button>
            {props.children}
        </div>;
    }
    else {
        return  <>
            <div style={{ border: '1px solid black', background: '#111', padding: '0 16px 0 0', top:0, left:0, bottom:0, right:'66%', position: 'absolute' }}  onClick={()=>setDescriptor(null)}>
                <div>
                    <TreeListItemComponent tree={descriptorTree} setDescriptor={setDescriptor} />
                </div>
                <DescriptorContentComponent descriptor={selectedDescriptor} setDescriptor={setDescriptor} />
            </div>
            <div style={{ left:'34%', top:0, bottom:0, right:0, position: 'absolute' }}>
                <button style={{width: 34, height: 18, padding: 0, margin: 0, position: 'absolute'}} onClick={() => setExpanded(false)}>&lt;&lt;</button>
                {props.children}
            </div>
        </>;
    }
}

function TreeListItemComponent(props: {tree: IDescriptorTree, setDescriptor: (d: ISortDescriptor)=>void }) {
    return <div>
        <a onClick={ev => { props.setDescriptor(props.tree.descriptor); ev.preventDefault(); ev.stopPropagation(); }}>{props.tree.descriptor.displayName}</a>
        <div style={{ marginLeft: 15 }}>
            {props.tree.children?.map(child => {
                return <TreeListItemComponent key={child.descriptor.displayName} tree={child} setDescriptor={props.setDescriptor} />
            }) ?? []}
        </div>
    </div>
}

function DescriptorContentComponent(props: {descriptor: ISortDescriptor | null, setDescriptor: (d: ISortDescriptor)=>void}) {
    if(props.descriptor === null) return <></>;
    else {
        return <div style={{ border: '1px solid black', background:'#333', position: 'absolute', left: '18px', top:0, right: 0, bottom: 0}}>
            <div style={{overflowY: 'scroll', left: 0, right: 0, top: 0, bottom: 0, position: 'absolute', padding: '0 12px'}} onClick={ev => {ev.preventDefault(); ev.stopPropagation(); }}>
                {props.descriptor.getDescription()}
            </div>
        </div>;
    }
}