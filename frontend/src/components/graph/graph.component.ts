import {Component, Input, ViewEncapsulation} from '@angular/core';
import {IGraph} from "../../types/graph";
import * as d3 from "d3";

@Component({
  selector: 'graph',
  templateUrl: './graph.component.html',
  styleUrls: ['graph.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GraphComponent {
  public data: IGraph;

  private readonly offset = 50;
  private readonly nodeSize = 15;
  private width;
  private height;
  private schedule: string[][];

  @Input() set graphData(data: IGraph) {
    this.data = {...data};
    this.schedule = null;
    this.destroyGraph();
    this.renderGraph();
  }

  @Input() set scheduleData(schedule: string[][]) {
    if (schedule) {
      this.schedule = schedule;
      this.destroyGraph();
      this.renderGraph();
    }
  }

  private renderGraph() {
    const svg = d3.select("#graph")
      .append("svg")
      .attr("id", "chart")
      .attr("width", "100%")
      .attr("height", "100%");

    const defs = svg.append("defs");
    const edges = svg.append("g").attr("class", "edges");
    const nodes = svg.append("g").attr("class", "nodes");

    const chart = document.getElementById("chart");
    this.width = chart.clientWidth;
    this.height = chart.clientHeight;

    this.schedule ? this.interpolationForParallelForm() : this.interpolation();

    this.data.edges = this.data.edges.map(edges => ({
      ...edges,
      coordinates: [
        this.getCoordinates(edges.source),
        this.getCoordinates(edges.target)
      ]
    }));

    this.renderMarkers(defs);
    this.renderNodes(nodes);
    this.renderEdges(edges);
  }

  private interpolation() {
    const linearX = d3.scaleLinear().domain([0, 100]).range([this.offset, this.width - this.offset]);
    const linearY = d3.scaleLinear().domain([0, 100]).range([this.offset, this.height - this.offset]);
    this.data.nodes = this.data.nodes.map(node => ({
      ...node,
      x: linearX(Math.round(Math.random() * 100)),
      y: linearY(Math.round(Math.random() * 100))
    }));
  }

  private interpolationForParallelForm() {
    const maxValue = Math.max(...this.schedule.map(group => group.length));
    const linearX = d3.scaleLinear().domain([0, this.schedule.length - 1]).range([this.offset, this.width - this.offset]);
    const linearY = d3.scaleLinear().domain([0, maxValue - 1]).range([this.offset, this.height - this.offset]);
    this.schedule.forEach((group, groupIndex) => {
      group.forEach((nodeId, nodeIndex) => {
        const currentNode = this.data.nodes.find(node => node.id === nodeId);
        currentNode.x = linearX(groupIndex);
        currentNode.y = linearY(maxValue - nodeIndex - 1);
      })
    });
  }

  private getCoordinates(nodeLabel: string) {
    const node = this.data.nodes.find(node => node.label === nodeLabel);
    return {
      x: node.x,
      y: node.y
    }
  }

  private dragged(d) {
    const {x, y} = d3.event;
    d3.select(this).select("circle")
      .attr("cx", d.x = x)
      .attr("cy", d.y = y);

    d3.select(this).select("text")
      .attr("x", d.x = x)
      .attr("y", d.y = y);

    d3.selectAll(`line[source="${d.label}"]`)
      .attr("x1", d.x = x)
      .attr("y1", d.y = y);

    d3.selectAll(`line[target="${d.label}"]`)
      .attr("x2", d.x = x)
      .attr("y2", d.y = y);
  }

  private clickHandler(d) {
    const node = d3.select(this);
    const isActive = node.classed("active");
    if (!isActive) {
      d3.selectAll("g.node").classed("active", false);
      GraphComponent.markAllActive();
      node.classed("active", true);
      GraphComponent.markInactive(d.label);
    } else {
      node.classed("active", false);
      GraphComponent.markAllActive();
    }
  }

  private renderNodes(nodes) {
    nodes.selectAll("g").data(this.data.nodes).enter()
      .append("g")
      .attr("class", "node")
      .call(d3.drag().on('drag', this.dragged))
      .on('click', this.clickHandler)
      .append("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", this.nodeSize);

    nodes.selectAll("g.node").data(this.data.nodes)
      .append("text")
      .attr("class", "label")
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .text(d => d.label);
  }

  private renderEdges(edges) {
    edges.selectAll("g").data(this.data.edges).enter()
      .append("line")
      .attr("class", "edge")
      .attr("source", d => d.source)
      .attr("target", d => d.target)
      .attr("x1", d => d.coordinates[0].x)
      .attr("y1", d => d.coordinates[0].y)
      .attr("x2", d => d.coordinates[1].x)
      .attr("y2", d => d.coordinates[1].y)
      .attr("marker-end", "url(#arrow_active)");
  }

  private renderMarkers(defs) {
    defs.selectAll("marker").data(["arrow_active", "arrow_inactive"]).enter()
      .append("marker")
      .attr("id", d => d)
      .attr("class", "marker")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", this.nodeSize + 5)
      .attr("markerWidth",  6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("svg:path")
      .attr("d", "M0,-5L10,0L0,5");
  }

  private static markAllActive() {
    d3.selectAll("g.node")
      .classed("inactive", false);

    d3.selectAll("line")
      .classed("inactive", false)
      .attr("marker-end", "url(#arrow_active)");
  }

  private static markInactive(label: string) {
    d3.selectAll("g.node:not(.active)")
      .classed("inactive", true);

    d3.selectAll(`line:not([source="${label}"]):not([target="${label}"])`)
      .classed("inactive", true)
      .attr("marker-end", "url(#arrow_inactive)");
  }

  private destroyGraph() {
    d3.select("#chart").remove();
  }
}
