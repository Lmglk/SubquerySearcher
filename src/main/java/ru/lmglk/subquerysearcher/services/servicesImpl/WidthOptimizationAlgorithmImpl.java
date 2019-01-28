package ru.lmglk.subquerysearcher.services.servicesImpl;

import org.springframework.stereotype.Service;
import ru.lmglk.subquerysearcher.enums.Direction;
import ru.lmglk.subquerysearcher.models.*;
import ru.lmglk.subquerysearcher.services.WidthOptimizationAlgorithm;

@Service
public class WidthOptimizationAlgorithmImpl implements WidthOptimizationAlgorithm {

    @Override
    public Schedule scheduleOptimizationByWidth (OptimizationData data) {
        Graph graph = data.getGraph();
        Schedule schedule = data.getSchedule();
        Statistic statistic = schedule.getStatistic();

        int theoryGroupSize = calcTheoryGroupSize(statistic.getNodes(), statistic.getHeight());
        int maxSizeGroup = statistic.getWidth();

        if (maxSizeGroup == theoryGroupSize) return schedule;

        for (int i = statistic.getHeight() - 1; i > 0; i--) {
            if (theoryGroupSize - schedule.getGroup(i).size() == 0) continue;
            schedule = moveIndependentSequences(i, i - 1, theoryGroupSize, schedule, graph, Direction.RIGHT);
        }

        for (int i = 0; i < statistic.getHeight() - 1; i++) {
            if (theoryGroupSize - schedule.getGroup(i).size() == 0) continue;
            schedule = moveIndependentSequences(i, i + 1, theoryGroupSize, schedule, graph, Direction.LEFT);
        }

        schedule.createStatistic();
        return schedule;
    }

    private int calcTheoryGroupSize(int countNodes, int maxGroupSize) {
        return (int) Math.ceil((double) countNodes / maxGroupSize);
    }

    private Schedule moveIndependentSequences(int groupIndex, int secondGroupIndex, int theoryGroupSize, Schedule s, Graph graph, Direction optimizationDirection) {
        Schedule schedule = new Schedule(s);
        Group group = schedule.getGroup(groupIndex);
        Group secondGroup = schedule.getGroup(secondGroupIndex);

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

    private boolean isExistEdge(Node node, Group group, Graph graph, Direction sequencePlace) {
        return group.getNodes()
                .stream()
                .noneMatch(targetNode -> sequencePlace == Direction.RIGHT
                        ? graph.isExistEdge(node, targetNode)
                        : graph.isExistEdge(targetNode, node));
    }

}
