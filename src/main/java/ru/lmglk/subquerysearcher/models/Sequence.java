package ru.lmglk.subquerysearcher.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
@AllArgsConstructor
public class Sequence extends Entity {

    private ArrayList<Node> nodes;

    public Sequence(Node node) {
        nodes = new ArrayList<>();
        nodes.add(node);
    }

    public Sequence() {
        nodes = new ArrayList<>();
    }

    public void addNode(Node node) {
        if (nodes.contains(node)) return;

        nodes.add(node);
    }
}
