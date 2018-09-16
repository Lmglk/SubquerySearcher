import {AfterViewInit, Component, Input, ViewEncapsulation} from '@angular/core';
import {IGraph} from "../../types/graph";
import * as d3 from "d3";

@Component({
  selector: 'graph',
  templateUrl: './graph.component.html',
  styleUrls: ['graph.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GraphComponent implements AfterViewInit {
  @Input() data: IGraph;

  private readonly offset = 50;
  private readonly nodeSize = 15;
  private width;
  private height;

  ngAfterViewInit(): void {
    console.log(this.data);

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

    const linearX = d3.scaleLinear().domain([0, 100]).range([this.offset, this.width - this.offset]);
    const linearY = d3.scaleLinear().domain([0, 100]).range([this.offset, this.height - this.offset]);

    const line = d3.line()
      .x(d => d.x)
      .y(d => d.y);

    defs.selectAll("marker").data(["arrow"]).enter()
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

    this.data.nodes = this.data.nodes.map(node => ({
      ...node,
      x: linearX(node.x),
      y: linearY(node.y)
    }));

    nodes.selectAll("g").data(this.data.nodes).enter()
      .append("g")
      .attr("class", "node")
      .append("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", d => d.size * this.nodeSize);

    nodes.selectAll("g.node").data(this.data.nodes)
      .append("text")
      .attr("class", "label")
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .text(d => d.label);

    this.data.edges = this.data.edges.map(edges => ({
      ...edges,
      coordinates: [
        this.getCoordinates(edges.source),
        this.getCoordinates(edges.target)
      ]
    }));

    edges.selectAll("g").data(this.data.edges).enter()
      .append("path")
      .attr("class", "edge")
      .attr("d", d => line(d.coordinates))
      .attr("marker-end", "url(#arrow)");
  }

  private getCoordinates(nodeLabel: string) {
    const node = this.data.nodes.find(node => node.label === nodeLabel);
    return {
      x: node.x,
      y: node.y
    }
  }
}
