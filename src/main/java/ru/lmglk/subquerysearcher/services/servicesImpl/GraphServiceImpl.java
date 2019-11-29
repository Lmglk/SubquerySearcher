package ru.lmglk.subquerysearcher.services.servicesImpl;

import org.springframework.stereotype.Service;
import ru.lmglk.subquerysearcher.models.*;
import ru.lmglk.subquerysearcher.services.GraphService;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class GraphServiceImpl implements GraphService {

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
                        Node newNode = new Node(node.getName() + "." + i, (int) Math.ceil((double) node.getTime() / item.getCount()));
                        newGraph.addNode(newNode);

                        Edge newEdge = new Edge(newNode.getId(), node.getId());
                        newGraph.addEdge(newEdge);

                        sourceNodes.forEach(sourceNode -> {
                            Edge newSourceEdge = new Edge(sourceNode.getId(), newNode.getId());
                            newGraph.addEdge(newSourceEdge);
                        });
                    }

                    node.setTime(1);
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

        return schedule;
    }

    private ArrayList<Node> subtractSet(ArrayList<Node> source, ArrayList<Node> target) {
        return source
                .stream()
                .filter(e -> target.stream().noneMatch(item -> item.getId().equals(e.getId())))
                .collect(Collectors.toCollection(ArrayList::new));
    }
}