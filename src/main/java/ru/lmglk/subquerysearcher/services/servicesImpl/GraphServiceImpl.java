package ru.lmglk.subquerysearcher.services.servicesImpl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ru.lmglk.subquerysearcher.models.*;
import ru.lmglk.subquerysearcher.services.GraphService;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class GraphServiceImpl implements GraphService {

    Logger logger = LoggerFactory.getLogger(GraphServiceImpl.class);

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

    public ScheduleResult optimizeScheduleWithoutTimestamp(OptimizationData data) {
        int theoryGroupSize = (int) Math.ceil((double) data.getGraph().getNodes().size() / data.getSchedule().size());
        ArrayList<HashSet<String>> schedule = data.getSchedule();

        int maxSize = schedule.stream().map(HashSet::size).max(Integer::compareTo).orElse(0);
        if (maxSize != theoryGroupSize) {
            for (int i = schedule.size() - 1; i > 0; i--) {
                ArrayList<String> group = new ArrayList<>(schedule.get(i));
                if (theoryGroupSize - group.size() > 0) {
                    ArrayList<String> previousGroup = new ArrayList<>(schedule.get(i - 1));

                    int sourceNodeIndex = 0;
                    while (sourceNodeIndex < previousGroup.size() && group.size() < theoryGroupSize) {
                        String sourceNode = previousGroup.get(sourceNodeIndex);
                        if (!isExistEdge(sourceNode, group, data.getGraph().getEdges())) {
                            group.add(sourceNode);
                            previousGroup.remove(sourceNode);
                        } else {
                            sourceNodeIndex++;
                        }
                    }

                    schedule.set(i, new HashSet<>(group));
                    schedule.set(i - 1, new HashSet<>(previousGroup));
                }
            }
        }

        return new ScheduleResult(schedule, null);
    }

    public ScheduleResult optimizeScheduleWithTimestamp(OptimizationData data) {
        HashSet<String> group = data.getSchedule().get(0);
        ArrayList<Edge> edges = data.getGraph().getEdges();

        ArrayList<Edge> currentGroup = getEdgeListWithEqualSource(group, edges);

        Edge min = currentGroup.stream().min(Comparator.comparingInt(Edge::getTime)).orElse(null);

        ArrayList<Edge> bindEdges = edges
                .stream()
                .filter(edge -> min.getTarget().equals(edge.getTarget()) && group.contains(edge.getSource()))
                .collect(Collectors.toCollection(ArrayList::new));

        Edge maxTimeEdge = bindEdges
                .stream()
                .max(Comparator.comparingInt(Edge::getTime))
                .orElse(null);

//        HashSet<String> nextGroupNameList = data.getSchedule().get(1);
//        ArrayList<Edge> nextGroup = getEdgeListWithEqualSource(nextGroupNameList, edges);

        return null;
    }

    private ArrayList<Edge> getEdgeListWithEqualSource(HashSet<String> edgeNameList, ArrayList<Edge> edges) {
        ArrayList<Edge> group = new ArrayList<>();
        edgeNameList.forEach(item -> {
            Edge currentEdge = edges
                    .stream()
                    .filter(edge -> item.equals(edge.getSource()))
                    .findFirst()
                    .orElse(null);
            group.add(currentEdge);
        });
        return group;
    }

    private boolean isExistEdge(String sourceNode, ArrayList<String> group, ArrayList<Edge> edges) {
        boolean isExistEdge = false;
        for (int targetNodeIndex = 0; targetNodeIndex < group.size() && !isExistEdge; targetNodeIndex++) {
            String targetNode = group.get(targetNodeIndex);
            isExistEdge = edges.stream()
                    .anyMatch(edge -> edge.getSource().equals(sourceNode) && edge.getTarget().equals(targetNode));
        }
        return isExistEdge;
    }

    private ArrayList<Node> subtractSet(ArrayList<Node> source, ArrayList<Node> target) {
        return source
                .stream()
                .filter(e -> target.stream().noneMatch(item -> item.getId().equals(e.getId())))
                .collect(Collectors.toCollection(ArrayList::new));
    }
}
