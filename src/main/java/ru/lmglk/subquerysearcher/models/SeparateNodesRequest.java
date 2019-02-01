package ru.lmglk.subquerysearcher.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SeparateNodesRequest {

    Graph graph;

    InfoSeparate info;
}
