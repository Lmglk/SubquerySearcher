package ru.lmglk.subquerysearcher.services;

import ru.lmglk.subquerysearcher.models.OptimizationData;
import ru.lmglk.subquerysearcher.models.Schedule;

public interface TimeOptimizationAlgorithm {

    Schedule scheduleOptimizationByTime(OptimizationData data);
}
