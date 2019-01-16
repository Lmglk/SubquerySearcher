import {Edge} from "./edge";
import {Node} from "./node";

export class Graph {
  private edgeId: number;

  public edges: Edge[];
  public nodes: Node[];

  constructor({edges, nodes}: Graph) {
    this.edges = edges;
    this.nodes = nodes;
    this.edgeId = Math.max(...edges.map(edge => edge.id));
  }

  public addNode(nodeName: string): void {
    this.nodes = [
      ...this.nodes,
      {
        id: nodeName,
        label: nodeName,
      }
    ];
  }

  public addTargetEdge(source: Node, target: Node): void {
    this.edges = [
      ...this.edges,
      {
        id: ++this.edgeId,
        source: source,
        target: target
      }
    ];
  }

  public addSourceEdge(source: Node, target: Node): void {
    this.edges = [
      ...this.edges,
      {
        id: ++this.edgeId,
        source: source,
        target: target
      }
    ];
  }

  public removeNode(nodeId: string): void {
    this.nodes.filter(node => node.id != nodeId);
    this.edges.filter(edge => edge.source.id != nodeId && edge.target.id != nodeId);
  }

  public getTargetEdges(nodeId: string) {
    return this.edges.filter(edge => edge.source.id === nodeId)
  }

  public getSourceEdges(nodeId: string) {
    return this.edges.filter(edge => edge.target.id === nodeId)
  }
}
