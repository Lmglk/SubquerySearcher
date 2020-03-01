package ru.lmglk.subquerysearcher.services;

import ru.lmglk.subquerysearcher.models.*;

import java.util.ArrayList;

public interface GraphService {

    ArrayList<Group> generateSchedule(Graph graph, ArrayList<ReplicationItem> replicationTable);
}
