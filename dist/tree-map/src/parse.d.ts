export default function parse(dir: string): Node[];
export interface Node {
    path: string;
    nodes: Node[];
    children: string[];
}
