package ru.lmglk.subquerysearcher.services.servicesImpl;

import org.springframework.stereotype.Service;
import ru.lmglk.subquerysearcher.enums.Direction;
import ru.lmglk.subquerysearcher.models.*;
import ru.lmglk.subquerysearcher.services.WidthOptimizationAlgorithm;

import java.util.ArrayList;

@Service
public class WidthOptimizationAlgorithmImpl implements WidthOptimizationAlgorithm {

    @Override
    public ArrayList<Group> scheduleOptimizationByWidth(Graph graph, ArrayList<Group> schedule) {
        int numberOfNodes = schedule.stream()
                .mapToInt(group -> (int) group.getSequences()
                        .stream()
                        .mapToInt(sequence -> sequence.getNodes().size())
                        .count()
                ).sum();

        int graphHeight = schedule.size();
        int graphWidth = schedule.stream().mapToInt(Group::size).max().orElse(0);
        int theoryGroupSize = calcTheoryGroupSize(numberOfNodes, graphHeight);

        if (graphWidth == theoryGroupSize) return schedule;

        for (int i = graphHeight - 1; i > 0; i--) {
            if (theoryGroupSize - schedule.get(i).size() == 0) continue;
            schedule = moveIndependentSequences(i, i - 1, theoryGroupSize, schedule, graph, Direction.RIGHT);
        }

        for (int i = 0; i < graphHeight - 1; i++) {
            if (theoryGroupSize - schedule.get(i).size() == 0) continue;
            schedule = moveIndependentSequences(i, i + 1, theoryGroupSize, schedule, graph, Direction.LEFT);
        }

        return schedule;
    }

    private int calcTheoryGroupSize(int countNodes, int maxGroupSize) {
        return (int) Math.ceil((double) countNodes / maxGroupSize);
    }

    private ArrayList<Group> moveIndependentSequences(int groupIndex, int secondGroupIndex, int theoryGroupSize, ArrayList<Group> s, Graph graph, Direction optimizationDirection) {
        ArrayList<Group> schedule = new ArrayList<>(s);
        Group group = schedule.get(groupIndex);
        Group secondGroup = schedule.get(secondGroupIndex);

        int sequenceIndex = 0;
        while (sequenceIndex < secondGroup.size() && group.size() < theoryGroupSize) {
            Sequence sequence = secondGroup.getSequence(sequenceIndex);
            if (canMoveSequence(sequence, group, graph, optimizationDirection)) {
                secondGroup.removeSequence(sequence);
                group.addSequence(sequence);
            } else {
                sequenceIndex++;
            }
        }

        return schedule;
    }

    private boolean canMoveSequence(Sequence sequence, Group group, Graph graph, Direction sequencePlace) {
        return sequence.getNodes()
                .stream()
                .allMatch(sourceNode -> isExistEdge(sourceNode, group, graph, sequencePlace));
    }

    private boolean isExistEdge(String node, Group group, Graph graph, Direction sequencePlace) {
        return group.getNodes()
                .stream()
                .noneMatch(targetNode -> sequencePlace == Direction.RIGHT
                        ? graph.isExistEdge(node, targetNode)
                        : graph.isExistEdge(targetNode, node));
    }

}
