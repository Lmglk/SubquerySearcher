package ru.lmglk.subquerysearcher.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
public class Graph {

    private ArrayList<Node> nodes;

    private ArrayList<Edge> edges;

    public Graph() {
        nodes = new ArrayList<>();
        edges = new ArrayList<>();
    }

    public Graph(Graph graph) {
        nodes = graph.getNodes()
                .stream()
                .map(Node::new)
                .collect(Collectors.toCollection(ArrayList::new));

        edges = graph.getEdges()
                .stream()
                .map(Edge::new)
                .collect(Collectors.toCollection(ArrayList::new));
    }

    public void addNode(String nodeName, int time) {
        Node node = findNode(nodeName);
        if (node != null) {
            node.setTime(time);
        } else {
            nodes.add(new Node(nodeName, time));
        }
    }

    public void addNode(Node node) {
        nodes.add(node);
    }

    public void addEdge(String source, String target) {
        Node sourceNode = getNodeByName(source);
        Node targetNode = getNodeByName(target);

        if (sourceNode == null) throw new NullPointerException("Node named \"" + source + "\" does not exist");
        if (targetNode == null) throw new NullPointerException("Node named \"" + target + "\" does not exist");

        edges.add(new Edge(sourceNode, targetNode));
    }

    public void addEdge(Edge edge) {
        boolean isExist = edges.stream().anyMatch(item -> edge.getId().equals(item.getId()));

        if (!isExist) {
            edges.add(edge);
        }
    }

    public void removeEdge(Edge edge) {
        this.edges = this.edges
                .stream()
                .filter(item -> !item.getId().equals(edge.getId()))
                .collect(Collectors.toCollection(ArrayList::new));
    }

    public void removeNode(Node node) {
        this.edges = this.edges
                .stream()
                .filter(edge -> !(edge.getSourceName().equals(node.getName()) || edge.getTargetName().equals(node.getName())))
                .collect(Collectors.toCollection(ArrayList::new));

        this.nodes = this.nodes
                .stream()
                .filter(item -> !item.getId().equals(node.getId()))
                .collect(Collectors.toCollection(ArrayList::new));
    }

    public void removeNode(ArrayList<Node> nodes) {
        nodes.forEach(this::removeNode);
    }

    @JsonIgnore
    public Node getNodeById(String id) {
        return this.nodes
                .stream()
                .filter(node -> id.equals(node.getId()))
                .findFirst()
                .orElse(null);
    }

    @JsonIgnore
    public ArrayList<Node> getSourceNodeList() {
        return this.edges
                .stream()
                .map(Edge::getSource)
                .filter(distinctByKey(Node::getId))
                .collect(Collectors.toCollection(ArrayList::new));
    }

    @JsonIgnore
    public ArrayList<Node> getTargetNodeList() {
        return this.edges
                .stream()
                .map(Edge::getTarget)
                .filter(distinctByKey(Node::getId))
                .collect(Collectors.toCollection(ArrayList::new));
    }

    @JsonIgnore
    public ArrayList<Node> getIndependentNodes() {
        return this.nodes
                .stream()
                .filter(node -> {
                    ArrayList<Edge> sourceEdges = getSourceEdgesForNode(node);
                    ArrayList<Edge> targetEdges = getTargetEdgesForNode(node);
                    return sourceEdges.isEmpty() && targetEdges.isEmpty();
                })
                .collect(Collectors.toCollection(ArrayList::new));
    }

    @JsonIgnore
    public boolean isExistNode(String nodeName) {
        return this.nodes
                .stream()
                .anyMatch(node -> nodeName.equals(node.getName()));
    }

    @JsonIgnore
    public boolean isExistEdge(Node sourceNode, Node targetNode) {
        return this.edges
                .stream()
                .anyMatch(edge -> edge.getSourceId().equals(sourceNode.getId()) && edge.getTargetId().equals(targetNode.getId()));
    }

    @JsonIgnore
    public ArrayList<Node> getSourceNodesForNode(Node node) {
        return getTargetEdgesForNode(node)
                .stream()
                .map(Edge::getSource)
                .collect(Collectors.toCollection(ArrayList::new));
    }

    @JsonIgnore
    public ArrayList<Edge> getSourceEdgesForNode(Node node) {
        return this.edges
                .stream()
                .filter(edge -> edge.getSource().getId().equals(node.getId()))
                .collect(Collectors.toCollection(ArrayList::new));
    }

    @JsonIgnore
    public ArrayList<Edge> getTargetEdgesForNode(Node node) {
        return this.edges
                .stream()
                .filter(edge -> edge.getTarget().getId().equals(node.getId()))
                .collect(Collectors.toCollection(ArrayList::new));
    }

    private Node findNode(String nodeName) {
        return nodes
                .stream()
                .filter(node -> nodeName.equals(node.getName()))
                .findFirst()
                .orElse(null);
    }

    private Node getNodeByName(String nodeName) {
        return nodes
                .stream()
                .filter(node -> nodeName.equals(node.getName()))
                .findFirst()
                .orElse(null);
    }

    private static <T> Predicate<T> distinctByKey(Function<? super T, Object> keyExtractor) {
        Map<Object, Boolean> map = new ConcurrentHashMap<>();
        return t -> map.putIfAbsent(keyExtractor.apply(t), Boolean.TRUE) == null;
    }
}
