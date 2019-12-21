package ru.lmglk.subquerysearcher.services;

import ru.lmglk.subquerysearcher.models.Graph;
import ru.lmglk.subquerysearcher.models.Group;

import java.util.ArrayList;

public interface WidthOptimizationAlgorithm {

    ArrayList<Group> scheduleOptimizationByWidth(Graph graph, ArrayList<Group> schedule);
}
