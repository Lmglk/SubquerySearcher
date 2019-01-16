package ru.lmglk.subquerysearcher.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Edge extends Entity {

    private Node source;

    private Node target;

    private int time;

    public Edge(Node source, Node target, int time) {
        this.source = source;
        this.target = target;
        this.time = time;
    }

    String getSourceName() {
        return source.getName();
    }

    String getTargetName() {
        return target.getName();
    }
}
