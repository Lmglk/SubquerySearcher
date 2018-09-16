import {IEdge} from "./edge";
import {INode} from "./node";

export interface IGraph {
  edges: IEdge[];
  nodes: INode[];
}
