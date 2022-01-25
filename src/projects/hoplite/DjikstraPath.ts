import Point from "../common/position/Point";


interface IPathfinderNode {
    position: Point;
    parent: IPathfinderNode | undefined;
    cost: number;
}

function toPath(node: IPathfinderNode): Point[] {
    if(node.parent === null) return [node.position];
    const parentPath = toPath(node.parent);
    parentPath.push(node.position);
    return parentPath;
}

// TODO: This is a quick and dirty Djikstra implementation with a ton of room for optimization.
//       Currently, bot the closed and open sets are unsorted arrays, which means each dequeue takes O(n) time and each neighbor check takes O(n) time.
export default function DjikstraPath(start: Point, isEnd: (pt: Point) => boolean, getNeighbors: (from: Point) => { to: Point, cost: number }[]): Point[] {
    const closedSet: IPathfinderNode[] = [];
    const openSet: IPathfinderNode[] = [{ position: start, parent: null, cost: 0 }];

    while (openSet.length > 0) {
        const minIndex = openSet.reduce((min, cur, i) => cur.cost < openSet[min].cost ? i : min, 0);
        const current = openSet.splice(minIndex, 1)[0];
        closedSet.push(current);

        if(isEnd(current.position)) {
            return toPath(current);
        }

        for(const neighbor of getNeighbors(current.position)) {
            const neighborNode = { position: neighbor.to, parent: current, cost: current.cost + neighbor.cost };
            if(closedSet.find(c => c.position.equals(neighborNode.position))) continue;
            const open = openSet.findIndex(c => c.position.equals(neighborNode.position));
            if(open === -1) {
                openSet.push(neighborNode);
            }
            else if(openSet[open].cost > neighborNode.cost) {
                openSet[open] = neighborNode;
            }
        }
    }

    return null; // No path!
}