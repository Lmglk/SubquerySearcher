package ru.lmglk.subquerysearcher.services;

import org.springframework.web.multipart.MultipartFile;
import ru.lmglk.subquerysearcher.models.*;

import java.util.ArrayList;

public interface GraphService {

    Graph readFile(MultipartFile file);

    Graph separateNodes(Graph graph, ArrayList<InfoSeparate> info);

    Schedule generateSchedule(Graph graph);
}
