package ru.lmglk.subquerysearcher.services;

import org.springframework.web.multipart.MultipartFile;
import ru.lmglk.subquerysearcher.models.*;

public interface GraphService {

    Graph readFile(MultipartFile file);

    Schedule generateSchedule(Graph graph);

    Schedule optimizeScheduleWithoutTimestamp(OptimizationData data);

    Schedule optimizeScheduleWithTimestamp(OptimizationData data);
}
