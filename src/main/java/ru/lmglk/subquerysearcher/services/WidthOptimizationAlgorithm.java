package ru.lmglk.subquerysearcher.services;

import ru.lmglk.subquerysearcher.models.OptimizationData;
import ru.lmglk.subquerysearcher.models.Schedule;

public interface WidthOptimizationAlgorithm {

    Schedule scheduleOptimizationByWidth(OptimizationData data);
}
