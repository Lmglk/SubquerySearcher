package ru.lmglk.subquerysearcher.services.servicesImpl;

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
    public Graph separateNodes(Graph graph, ArrayList<InfoSeparate> separateNodesInfo) {
        Graph newGraph = new Graph(graph);

        separateNodesInfo
                .stream()
                .filter(item -> item.getCount() > 1)
                .forEach(item -> {
                    Node node = newGraph.getNodeById(item.getNodeId());
                    ArrayList<Node> sourceNodes = newGraph.getSourceNodesForNode(node);
                    ArrayList<Edge> sourceEdges = newGraph.getTargetEdgesForNode(node);

                    sourceEdges.forEach(newGraph::removeEdge);

                    for (int i = 1; i <= item.getCount(); i++) {
                        Node newNode = new Node(node.getName() + "." + i, node.getTime());
                        newGraph.addNode(newNode);

                        Edge newEdge = new Edge(newNode, node);
                        newGraph.addEdge(newEdge);

                        sourceNodes.forEach(sourceNode -> {
                            Edge newSourceEdge = new Edge(sourceNode, newNode);
                            newGraph.addEdge(newSourceEdge);
                        });
                    }
                });
        
        return newGraph;
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

        schedule.createMetrics();
        return schedule;
    }

    private ArrayList<Node> subtractSet(ArrayList<Node> source, ArrayList<Node> target) {
        return source
                .stream()
                .filter(e -> target.stream().noneMatch(item -> item.getId().equals(e.getId())))
                .collect(Collectors.toCollection(ArrayList::new));
    }
}