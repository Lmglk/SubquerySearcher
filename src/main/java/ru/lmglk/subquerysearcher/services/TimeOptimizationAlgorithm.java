package ru.lmglk.subquerysearcher.services;

import ru.lmglk.subquerysearcher.models.Graph;
import ru.lmglk.subquerysearcher.models.Group;

import java.util.ArrayList;

public interface TimeOptimizationAlgorithm {

    ArrayList<Group> scheduleOptimizationByTime(Graph graph, ArrayList<Group> schedule);
}
