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

    public Node addNode(String nodeName, int time) {
        Node node = findNode(nodeName);

        if (node == null) {
            node = new Node(nodeName, time);
            nodes.add(node);
        } else {
            node.setTime(time);
        }

        return node;
    }

    public void addNode(Node node) {
        nodes.add(node);
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
                .filter(edge -> {
                    Node sourceNode = this.getNodeById(edge.getSourceId());
                    Node targetNode = this.getNodeById(edge.getTargetId());

                    return !(sourceNode.getName().equals(node.getName()) || targetNode.getName().equals(node.getName()));
                })
                .collect(Collectors.toCollection(ArrayList::new));

        this.nodes = this.nodes
                .stream()
                .filter(item -> !item.getId().equals(node.getId()))
                .collect(Collectors.toCollection(ArrayList::new));
    }

    @JsonIgnore
    public void removeNode(ArrayList<String> nodeIds) {
        nodes.forEach(node -> {
            if (nodeIds.contains(node.getId())) {
                this.removeNode(node);
            }
        });
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
                .map(edge -> getNodeById(edge.getSourceId()))
                .filter(distinctByKey(Node::getId))
                .collect(Collectors.toCollection(ArrayList::new));
    }

    @JsonIgnore
    public ArrayList<Node> getTargetNodeList() {
        return this.edges
                .stream()
                .map(edge -> getNodeById(edge.getTargetId()))
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
    public boolean isExistEdge(String sourceId, String targetId) {
        return this.edges
                .stream()
                .anyMatch(edge -> edge.getSourceId().equals(sourceId) && edge.getTargetId().equals(targetId));
    }

    @JsonIgnore
    public ArrayList<Node> getSourceNodesForNode(Node node) {
        return getTargetEdgesForNode(node)
                .stream()
                .map(edge -> getNodeById(edge.getSourceId()))
                .collect(Collectors.toCollection(ArrayList::new));
    }

    @JsonIgnore
    public ArrayList<Edge> getSourceEdgesForNode(Node node) {
        return this.edges
                .stream()
                .filter(edge -> edge.getSourceId().equals(node.getId()))
                .collect(Collectors.toCollection(ArrayList::new));
    }

    @JsonIgnore
    public ArrayList<Edge> getTargetEdgesForNode(Node node) {
        return this.edges
                .stream()
                .filter(edge -> edge.getTargetId().equals(node.getId()))
                .collect(Collectors.toCollection(ArrayList::new));
    }

    private Node findNode(String nodeName) {
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
