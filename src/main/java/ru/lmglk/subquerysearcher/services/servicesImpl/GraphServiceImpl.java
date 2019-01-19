package ru.lmglk.subquerysearcher.services.servicesImpl;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ru.lmglk.subquerysearcher.enums.Direction;
import ru.lmglk.subquerysearcher.models.*;
import ru.lmglk.subquerysearcher.services.GraphService;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class GraphServiceImpl implements GraphService {

    @Override
    public Graph readFile(MultipartFile file) {
        Graph graph = new Graph();
        try {
            InputStream inputStream = file.getInputStream();
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
            String str;
            while ((str = bufferedReader.readLine()) != null) {
                String[] arr = str.split(" ");
                int time = (arr.length == 3) ? Integer.parseInt(arr[2]) : 1;
                graph.addNode(arr[0]);
                graph.addNode(arr[1]);
                graph.addEdge(arr[0], arr[1], time);
            }
            bufferedReader.close();
            inputStream.close();
        } catch (Exception e) {
            return null;
        }

        return graph;
    }


    @Override
    public Schedule generateSchedule(Graph graph) {
        Schedule schedule = new Schedule();

        while (!graph.getNodes().isEmpty()) {
            ArrayList<Node> sourceNodes = graph.getSourceNodeList();
            ArrayList<Node> targetNodes = graph.getTargetNodeList();

            ArrayList<Sequence> sequences = subtractSet(sourceNodes, targetNodes)
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

            schedule.addGroup(group);
        }

        schedule.createStatistic();
        return schedule;
    }

    @Override
    public Schedule optimizeScheduleWithoutTimestamp(OptimizationData data) {
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

//    public ScheduleResult optimizeScheduleWithTimestamp(OptimizationData data) {
//        HashSet<String> group = data.getSchedule().get(0);
//        ArrayList<Edge> edges = data.getGraph().getEdges();
//
//        ArrayList<Edge> currentGroup = getEdgeListWithEqualSource(group, edges);
//
//        Edge min = currentGroup.stream().min(Comparator.comparingInt(Edge::getTime)).orElse(null);
//
//        ArrayList<Edge> bindEdges = edges
//                .stream()
//                .filter(edge -> min.getTarget().equals(edge.getTarget()) && group.contains(edge.getSource()))
//                .collect(Collectors.toCollection(ArrayList::new));
//
//        Edge maxTimeEdge = bindEdges
//                .stream()
//                .max(Comparator.comparingInt(Edge::getTime))
//                .orElse(null);
//
////        HashSet<String> nextGroupNameList = data.getSchedule().get(1);
////        ArrayList<Edge> nextGroup = getEdgeListWithEqualSource(nextGroupNameList, edges);
//
//        return null;
//    }

    @Override
    public Schedule optimizeScheduleWithTimestamp(OptimizationData data) {
        return null;
    }

    private int calcTheoryGroupSize(int countNodes, int maxGroupSize) {
        return (int) Math.ceil((double) countNodes / maxGroupSize);
    }

    private ArrayList<Node> subtractSet(ArrayList<Node> source, ArrayList<Node> target) {
        return source
                .stream()
                .filter(e -> target.stream().noneMatch(item -> item.getId().equals(e.getId())))
                .collect(Collectors.toCollection(ArrayList::new));
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
