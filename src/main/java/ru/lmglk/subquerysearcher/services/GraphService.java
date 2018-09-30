package ru.lmglk.subquerysearcher.services;

import org.springframework.web.multipart.MultipartFile;
import ru.lmglk.subquerysearcher.models.Edge;
import ru.lmglk.subquerysearcher.models.Graph;
import ru.lmglk.subquerysearcher.models.OptimizationData;
import ru.lmglk.subquerysearcher.models.ScheduleResult;

import java.util.ArrayList;
import java.util.HashSet;

public interface GraphService {

    Graph readFile(MultipartFile file);

    ScheduleResult generateSchedule(ArrayList<Edge> edgeList);

    ScheduleResult optimizeSchedule(OptimizationData data);
}
