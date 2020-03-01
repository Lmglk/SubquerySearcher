package ru.lmglk.subquerysearcher.services.servicesImpl;

import org.springframework.stereotype.Service;
import ru.lmglk.subquerysearcher.models.*;
import ru.lmglk.subquerysearcher.services.GraphService;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class GraphServiceImpl implements GraphService {
    @Override
    public ArrayList<Group> generateSchedule(Graph graph, ArrayList<ReplicationItem> replicationTable) {
        ArrayList<Group> schedule = new ArrayList<>();

        while (!graph.getNodes().isEmpty()) {
            ArrayList<Node> sourceNodes = graph.getSourceNodeList();
            ArrayList<Node> targetNodes = graph.getTargetNodeList();

            ArrayList<Node> nodes = subtractSet(sourceNodes, targetNodes);
            ArrayList<Node> filteredNodes = filterByReplicationTable(nodes, replicationTable);

            ArrayList<Sequence> sequences = filteredNodes
                    .stream()
                    .map(Sequence::new)
                    .collect(Collectors.toCollection(ArrayList::new));

            Group group = new Group(sequences);
            graph.getIndependentNodes().forEach(node -> {
                group.addSequence(node);
                graph.removeNode(node);
            });
            graph.removeNode(group.getNodes());

            if (group.getNodes().isEmpty()) return null;

            schedule.add(group);
        }

        return schedule;
    }

    private ArrayList<Node> subtractSet(ArrayList<Node> source, ArrayList<Node> target) {
        return source
                .stream()
                .filter(e -> target.stream().noneMatch(item -> item.getId().equals(e.getId())))
                .collect(Collectors.toCollection(ArrayList::new));
    }

    private ArrayList<Node> filterByReplicationTable(ArrayList<Node> nodes, ArrayList<ReplicationItem> replicationTable) {
        if (replicationTable.size() == 0) {
            return nodes;
        }

        Set<Integer> visited = new HashSet<>();
        return nodes
                .stream()
                .filter(node -> {
                    ReplicationItem currentReplicationItem = replicationTable
                            .stream()
                            .filter(item -> item.getNodeId().equals(node.getId()))
                            .findFirst().orElse(null);

                    if (currentReplicationItem == null) {
                        return true;
                    }

                    int currentLocation = currentReplicationItem.getLocation();

                    if (visited.contains(currentLocation)) {
                        return false;
                    }

                    visited.add(currentLocation);
                    return true;
                })
                .collect(Collectors.toCollection(ArrayList::new));
    }
}