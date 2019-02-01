package ru.lmglk.subquerysearcher.services;

import org.springframework.web.multipart.MultipartFile;
import ru.lmglk.subquerysearcher.models.*;

public interface GraphService {

    Graph readFile(MultipartFile file);

    Graph separateNodes(Graph graph, InfoSeparate info);

    Schedule generateSchedule(Graph graph);
}
