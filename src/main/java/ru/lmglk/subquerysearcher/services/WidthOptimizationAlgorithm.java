package ru.lmglk.subquerysearcher.services;

import ru.lmglk.subquerysearcher.models.Group;
import ru.lmglk.subquerysearcher.models.OptimizationData;

import java.util.ArrayList;

public interface WidthOptimizationAlgorithm {

    ArrayList<Group>  scheduleOptimizationByWidth(OptimizationData data);
}
