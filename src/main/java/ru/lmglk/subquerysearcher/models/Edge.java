package ru.lmglk.subquerysearcher.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Edge extends Entity {

    private String sourceId;

    private String targetId;

    public Edge(Edge edge) {
        this.sourceId = edge.getSourceId();
        this.targetId = edge.getTargetId();
    }

    public String getSourceId() {
        return sourceId;
    }

    public String getTargetId() {
        return targetId;
    }
}
