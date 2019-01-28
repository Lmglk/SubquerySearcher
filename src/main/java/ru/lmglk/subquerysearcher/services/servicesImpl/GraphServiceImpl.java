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
import java.util.stream.Stream;

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
                graph.addNode(arr[0], time);
                graph.addNode(arr[1], 1);
                graph.addEdge(arr[0], arr[1]);
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

    @Override
    public Schedule optimizeScheduleWithTimestamp(OptimizationData data) {
        Schedule schedule = data.getSchedule();
        Graph graph = data.getGraph();

        for (int i = 0; i < schedule.getGroups().size() - 1; i++) {
            Group sourceGroup = schedule.getGroup(i);
            Group targetGroup = schedule.getGroup(i + 1);

            boolean isCanMove = true;
            while (isCanMove) {
                if (isAlignGroup(sourceGroup)) break;

                if (targetGroup.size() == 0)
                    targetGroup = schedule.getGroup(i + 1);

                ArrayList<Sequence> minSequenceList = sourceGroup.getSequenceWithMinTime();

                for (Sequence minSequence: minSequenceList) {
                    ArrayList<Node> allowedNodesToAttach = getAllowedNodesToAttach(minSequence.getLastNode(), sourceGroup, targetGroup, graph);

                    for (Node targetNode : allowedNodesToAttach) {
                        isCanMove = isCanMoveNode(minSequence.getLastNode(), targetNode, sourceGroup, graph);
                        if (isCanMove) {
                            schedule.removeNode(targetNode, targetGroup);
                            sourceGroup.addNodeToSequence(minSequence, targetNode);
                            break;
                        }
                    }

                    if (!isCanMove) break;
                }
            }
        }

        schedule.createStatistic();
        return schedule;
    }

    private ArrayList<Node> getAllowedNodesToAttach(Node sourceNode, Group sourceGroup, Group targetGroup, Graph graph) {
        return Stream
                .concat(
                        getTargetNodesBindedToNode(targetGroup, sourceNode, graph).stream(),
                        getIndependentTargetNodesForSubGraph(sourceGroup, targetGroup, graph.getEdges()).stream()
                )
                .collect(Collectors.toCollection(ArrayList::new));
    }

    private boolean isCanMoveNode(Node sourceNode, Node targetNode, Group group, Graph graph) {
        return getSourceNodesBindedToTargetNode(group, targetNode, graph)
                .stream()
                .filter(node -> node != sourceNode)
                .collect(Collectors.toCollection(ArrayList::new))
                .isEmpty();
    }

    private ArrayList<Node> getSourceNodesBindedToTargetNode(Group group, Node targetNode, Graph graph) {
        ArrayList<Node> lastNodes = group.getSequences()
            .stream()
            .map(Sequence::getLastNode)
            .collect(Collectors.toCollection(ArrayList::new));

        return lastNodes
                .stream()
                .filter(sourceNode -> graph.isExistEdge(sourceNode, targetNode))
                .collect(Collectors.toCollection(ArrayList::new));
    }

    private ArrayList<Node> getTargetNodesBindedToNode(Group group, Node node, Graph graph) {
        return group.getNodes()
                .stream()
                .filter(targetNode -> graph.isExistEdge(node, targetNode))
                .collect(Collectors.toCollection(ArrayList::new));

    }

    private ArrayList<Node> getIndependentTargetNodesForSubGraph(Group firstGroup, Group secondGroup, ArrayList<Edge> edges) {
        ArrayList<Node> sourceNodes = getLastNodesFromGroup(firstGroup);
        ArrayList<Node> targetNodes = getLastNodesFromGroup(secondGroup);

        ArrayList<Edge> subGraphEdges = edges
                .stream()
                .filter(edge -> isExistNodeInArray(sourceNodes, edge.getSource()) && isExistNodeInArray(targetNodes, edge.getTarget()))
                .collect(Collectors.toCollection(ArrayList::new));

        ArrayList<Node> subGraphNodes = new ArrayList<>();
        subGraphNodes.addAll(sourceNodes);
        subGraphNodes.addAll(targetNodes);

        Graph subGraph = new Graph(subGraphNodes, subGraphEdges);
        ArrayList<Node> independentNodes = subGraph.getIndependentNodes();
        return subtractSet(independentNodes, sourceNodes);
    }

     private ArrayList<Node> getLastNodesFromGroup(Group group) {
        return group.getSequences()
                .stream()
                .map(Sequence::getLastNode)
                .collect(Collectors.toCollection(ArrayList::new));
     }

    private boolean isExistNodeInArray(ArrayList<Node> nodeList, Node node) {
        return nodeList
                .stream()
                .anyMatch(item -> item.getId().equals(node.getId()));
    }

    private boolean isAlignGroup(Group group) {
        return group.getSequences()
                .stream()
                .allMatch(sequence -> sequence.getTime() == group.getTime());
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