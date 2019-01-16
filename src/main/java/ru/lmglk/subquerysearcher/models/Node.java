package ru.lmglk.subquerysearcher.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Node extends Entity {

    private String name;

    public Node(String name) {
        this.name = name;
    }
}
