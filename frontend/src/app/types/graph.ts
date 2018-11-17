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

  public addTargetEdge(sourceNode: string, targetNode: string): void {
    this.edges = [
      ...this.edges,
      {
        id: ++this.edgeId,
        source: sourceNode,
        target: targetNode
      }
    ];
  }

  public addSourceEdge(sourceNode: string, targetNode: string): void {
    this.edges = [
      ...this.edges,
      {
        id: ++this.edgeId,
        source: sourceNode,
        target: targetNode
      }
    ];
  }

  public removeNode(nodeId: string): void {
    this.nodes.filter(node => node.id != nodeId);
    this.edges.filter(edge => edge.source != nodeId && edge.target != nodeId);
  }

  public getTargetEdges(nodeId: string) {
    return this.edges.filter(edge => edge.source === nodeId)
  }

  public getSourceEdges(nodeId: string) {
    return this.edges.filter(edge => edge.target === nodeId)
  }
}
