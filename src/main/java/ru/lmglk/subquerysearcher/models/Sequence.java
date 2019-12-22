package ru.lmglk.subquerysearcher.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
@AllArgsConstructor
public class Sequence extends Entity {

    private ArrayList<String> nodes;

    private int time;

    public Sequence(Node node) {
        nodes = new ArrayList<>();
        nodes.add(node.getId());
        this.time = node.getTime();
    }

    public Sequence(Sequence sequence) {
        super(sequence.getId());
        nodes = new ArrayList<>(sequence.getNodes());
        time = sequence.time;
    }

    public void addNode(Node node) {
        if (nodes.contains(node.getId())) return;

        nodes.add(node.getId());
        time += node.getTime();
    }

    public void removeNode(Node node) {
        nodes.remove(node.getId());
        time -= node.getTime();
    }

    @JsonIgnore
    public String getLastNode() {
        return nodes.get(nodes.size() - 1);
    }

    @JsonIgnore
    public int size() {
        return nodes.size();
    }
}
