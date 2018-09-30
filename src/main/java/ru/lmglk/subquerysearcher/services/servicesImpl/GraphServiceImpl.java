package ru.lmglk.subquerysearcher.services.servicesImpl;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ru.lmglk.subquerysearcher.models.*;
import ru.lmglk.subquerysearcher.services.GraphService;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.stream.Collectors;

@Service
public class GraphServiceImpl implements GraphService {

    @Override
    public Graph readFile(MultipartFile file) {
        ArrayList<Edge> edges = new ArrayList<>();
        ArrayList<Node> nodes = new ArrayList<>();
        HashSet<String> tempNodes = new HashSet<>();
        try {
            InputStream inputStream = file.getInputStream();
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
            String str;
            long id = 1;
            while ((str = bufferedReader.readLine()) != null) {
                String arr[] = str.split(" ");
                edges.add(new Edge(id++, arr[0], arr[1]));
                tempNodes.add(arr[0]);
                tempNodes.add(arr[1]);
            }
            nodes = (ArrayList<Node>) tempNodes.stream().map(node -> new Node(node, node)).collect(Collectors.toList());
            bufferedReader.close();
            inputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return new Graph(nodes, edges);
    }

    @Override
    public ScheduleResult generateSchedule(ArrayList<Edge> edgeList) {
        ArrayList<HashSet<String>> schedule = new ArrayList<>();
        HashSet<String> remainder = new HashSet<>();
        HashSet<String> oldRemainder;

        while (edgeList.size() > 0) {
            HashSet<String> group = new HashSet<>();
            HashSet<String> targetNodes = new HashSet<>();
            edgeList.forEach(item -> {
                group.add(item.getSource());
                targetNodes.add(item.getTarget());
            });
            oldRemainder = new HashSet<>(remainder);
            remainder = new HashSet<>(targetNodes);
            remainder.removeAll(group);
            group.removeAll(targetNodes);

            oldRemainder.removeAll(remainder);
            if (group.size() == 0)
                return null;

            if (oldRemainder.size() != 0)
                group.addAll(oldRemainder);
            schedule.add(group);
            edgeList = edgeList.stream()
                    .filter(e -> !group.contains(e.getSource()))
                    .collect(Collectors.toCollection(ArrayList::new));
            if (edgeList.size() <= 0 && group.size() != 0) {
                schedule.add(targetNodes);
            }
        }

        return new ScheduleResult(schedule, createStatistics(schedule));
    }

    public ScheduleResult optimizeSchedule(OptimizationData data) {
        int maxGroupSize = (int) Math.ceil((double) data.getGraph().getNodes().size() / data.getSchedule().size());
        ArrayList<HashSet<String>> schedule = data.getSchedule();

        for (int i = schedule.size() - 1; i > 0; i--) {
            ArrayList<String> group = new ArrayList<>(schedule.get(i));
            if (maxGroupSize - group.size() > 0) {
                ArrayList<String> previousGroup = new ArrayList<>(schedule.get(i - 1));

                int sourceNodeIndex = 0;
                while (sourceNodeIndex < previousGroup.size() && group.size() < maxGroupSize) {
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

        return new ScheduleResult(schedule, createStatistics(schedule));
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

    private Statistics createStatistics(ArrayList<HashSet<String>> schedule) {
        int maxCount = schedule.stream().map(HashSet::size).max(Integer::compareTo).get();

        HashSet<String> lastFullyItem = schedule.stream()
                .filter(group -> group.size() == maxCount)
                .reduce((a, b) -> b)
                .orElse(null);

        int totalBubbles = schedule.stream().mapToInt(group -> maxCount - group.size()).sum();

        int hardBubbles = 0;
        for (HashSet<String> item : schedule) {
            if (item.equals(lastFullyItem)) break;
            hardBubbles += maxCount - item.size();
        }

        return new Statistics(totalBubbles, hardBubbles);
    }
}
