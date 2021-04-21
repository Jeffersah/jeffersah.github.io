import ITreeItem from "../../../projects/common/parsing/StackItems/ITreeItem";
import * as React from 'react';
import Token from "../../../projects/common/parsing/Token";
import TreeBranch from "../../../projects/common/parsing/StackItems/TreeBranch";
import EPatternType from "../../../projects/common/parsing/EPatternType";

export default function TreeRenderComponent(props: {tree: ITreeItem}) {
    if((props.tree as TreeBranch).children !== undefined){
        const branch = props.tree as TreeBranch;
        return <div>
            <table>
                <tbody>
                    {branch.children.map((item, i) =>
                        <tr key={i} style={{ verticalAlign: 'top' }}>
                            <td style={{border: '1px solid black', borderWidth: '0 0 1px 4px'}}>{branch.production.patterns[i].toString()}</td>
                            <td style={{border: '1px solid black', borderWidth: '0 0 1px 0'}}>{branch.production.patterns[i].type === EPatternType.literal ? <></> : <TreeRenderComponent tree={item} />}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    }
    return <span>{props.tree.firstToken().value}</span>;
}