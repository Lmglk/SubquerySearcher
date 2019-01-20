package ru.lmglk.subquerysearcher.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
public class Sequence extends Entity {

    private ArrayList<Node> nodes;

    private int time;

    public Sequence(Node node) {
        nodes = new ArrayList<>();
        nodes.add(node);
        time = node.getTime();
    }

    public Sequence(Sequence sequence) {
        super(sequence.getId());
        nodes = sequence.getNodes()
                .stream()
                .map(Node::new)
                .collect(Collectors.toCollection(ArrayList::new));
        time = nodes
                .stream()
                .mapToInt(Node::getTime)
                .sum();
    }

    public Sequence() {
        nodes = new ArrayList<>();
    }

    public void addNode(Node node) {
        if (nodes.contains(node)) return;

        nodes.add(node);
        time += node.getTime();
    }

    public void removeNode(Node node) {
        nodes.remove(node);
        time -= node.getTime();
    }

    @JsonIgnore
    public Node getLastNode() {
        return nodes.get(nodes.size() - 1);
    }

    @JsonIgnore
    public int size() {
        return nodes.size();
    }
}
