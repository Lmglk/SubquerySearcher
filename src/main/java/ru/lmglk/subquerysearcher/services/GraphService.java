package ru.lmglk.subquerysearcher.services;

import ru.lmglk.subquerysearcher.models.*;

import java.util.ArrayList;

public interface GraphService {

    Graph separateNodes(Graph graph, ArrayList<InfoSeparate> info);

    Schedule generateSchedule(Graph graph);
}
