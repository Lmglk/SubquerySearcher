package ru.lmglk.subquerysearcher.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Node extends Entity {

    private String name;

    private int time;

    public Node(String name, int time) {
        this.name = name;
        this.time = time;
    }

    public Node(Node node) {
        super(node.getId());
        name = node.name;
        time = node.time;
    }
}
