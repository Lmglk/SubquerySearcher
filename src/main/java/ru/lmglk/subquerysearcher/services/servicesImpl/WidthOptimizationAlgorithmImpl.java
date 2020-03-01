package ru.lmglk.subquerysearcher.services.servicesImpl;

import org.springframework.stereotype.Service;
import ru.lmglk.subquerysearcher.enums.Direction;
import ru.lmglk.subquerysearcher.models.Graph;
import ru.lmglk.subquerysearcher.models.Group;
import ru.lmglk.subquerysearcher.models.ReplicationItem;
import ru.lmglk.subquerysearcher.models.Sequence;
import ru.lmglk.subquerysearcher.services.WidthOptimizationAlgorithm;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Service
public class WidthOptimizationAlgorithmImpl implements WidthOptimizationAlgorithm {

    @Override
    public ArrayList<Group> scheduleOptimizationByWidth(Graph graph, ArrayList<Group> schedule, ArrayList<ReplicationItem> replicationTable) {
        int numberOfNodes = graph.getNumberOfNodes();
        int graphHeight = schedule.size();
        int graphWidth = calcMaxGroupSize(schedule);
        int theoryGroupSize = calcTheoryGroupSize(numberOfNodes, graphHeight);

        if (graphWidth == theoryGroupSize) return schedule;

        for (int i = graphHeight - 1; i > 0; i--) {
            if (theoryGroupSize - schedule.get(i).size() == 0) continue;
            schedule = moveIndependentSequences(i, theoryGroupSize, schedule, replicationTable, graph, Direction.RIGHT);
        }

        for (int i = 0; i < graphHeight - 1; i++) {
            if (theoryGroupSize - schedule.get(i).size() == 0) continue;
            schedule = moveIndependentSequences(i, theoryGroupSize, schedule, replicationTable, graph, Direction.LEFT);
        }

        return schedule;
    }

    private int calcTheoryGroupSize(int countNodes, int maxGroupSize) {
        return (int) Math.ceil((double) countNodes / maxGroupSize);
    }

    private ArrayList<Group> moveIndependentSequences(
            int groupIndex,
            int theoryGroupSize,
            ArrayList<Group> s,
            ArrayList<ReplicationItem> replicationTable,
            Graph graph, Direction optimizationDirection
    ) {
        ArrayList<Group> schedule = new ArrayList<>(s);
        int prevGroupIndex = optimizationDirection == Direction.RIGHT ? groupIndex - 1 : groupIndex + 1;
        Group group = schedule.get(groupIndex);
        Group prevGroup = schedule.get(prevGroupIndex);

        int sequenceIndex = 0;
        while (sequenceIndex < prevGroup.size() && group.size() < theoryGroupSize) {
            Sequence sequence = prevGroup.getSequence(sequenceIndex);
            String nodeId = sequence.getLastNode();
            if (canMoveNode(nodeId, group, replicationTable, graph, optimizationDirection)) {
                prevGroup.removeSequence(sequence);
                group.addSequence(sequence);
            } else {
                sequenceIndex++;
            }
        }

        return schedule;
    }

    private boolean canMoveNode(String nodeId, Group group, ArrayList<ReplicationItem> replicationTable, Graph graph, Direction sequencePlace) {
        boolean isExistEdge = group.getNodes()
                .stream()
                .anyMatch(targetNode -> sequencePlace == Direction.RIGHT
                        ? graph.isExistEdge(nodeId, targetNode)
                        : graph.isExistEdge(targetNode, nodeId));

        if (isExistEdge) {
            return false;
        }

        ReplicationItem currentReplicationItem = getReplicationItemByNodeId(replicationTable, nodeId);

        if (currentReplicationItem == null) {
            return true;
        }

        Set<Integer> visits = getMaskVisits(group.getNodes(), replicationTable);
        int currentLocation = currentReplicationItem.getLocation();

        return !visits.contains(currentLocation);
    }

    private int calcMaxGroupSize(ArrayList<Group> schedule) {
        return schedule.stream().mapToInt(Group::size).max().orElse(0);
    }

    // TODO: remove code duplication
    private ReplicationItem getReplicationItemByNodeId(ArrayList<ReplicationItem> replicationTable, String nodeId) {
        return replicationTable
                .stream()
                .filter(item -> item.getNodeId().equals(nodeId))
                .findFirst().orElse(null);
    }

    private Set<Integer> getMaskVisits(ArrayList<String> nodeIds, ArrayList<ReplicationItem> replicationTable) {
        Set<Integer> visited = new HashSet<>();
        nodeIds
                .stream()
                .map(itemId -> getReplicationItemByNodeId(replicationTable, itemId))
                .filter(Objects::nonNull)
                .forEach(item -> {
                    int currentLocation = item.getLocation();
                    visited.add(currentLocation);
                });

        return visited;
    }
}
