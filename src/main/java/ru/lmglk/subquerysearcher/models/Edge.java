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

    public Edge(Node source, Node target) {
        this.source = source;
        this.target = target;
    }

    public Edge(Edge edge) {
        this.source = edge.getSource();
        this.target = edge.getTarget();
    }

    String getSourceName() {
        return source.getName();
    }

    String getTargetName() {
        return target.getName();
    }

    String getSourceId() {
        return source.getId();
    }

    String getTargetId() {
        return target.getId();
    }
}
