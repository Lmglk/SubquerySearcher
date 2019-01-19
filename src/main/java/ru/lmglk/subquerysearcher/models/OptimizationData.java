package ru.lmglk.subquerysearcher.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OptimizationData {

    Graph graph;

    Schedule schedule;
}
