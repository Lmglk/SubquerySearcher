package ru.lmglk.subquerysearcher.services.servicesImpl;

import org.springframework.stereotype.Service;
import ru.lmglk.subquerysearcher.models.*;
import ru.lmglk.subquerysearcher.services.TimeOptimizationAlgorithm;

import java.util.ArrayList;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class TimeOptimizationAlgorithmImpl implements TimeOptimizationAlgorithm {

    @Override
    public Schedule scheduleOptimizationByTime(OptimizationData data) {
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

        schedule.createMetrics();
        return schedule;
    }

    private boolean isAlignGroup(Group group) {
        return group.getSequences()
                .stream()
                .allMatch(sequence -> sequence.getTime() == group.getTime());
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
                .filter(edge -> isExistNodeInArray(sourceNodes, edge.getSourceId()) && isExistNodeInArray(targetNodes, edge.getTargetId()))
                .collect(Collectors.toCollection(ArrayList::new));

        ArrayList<Node> subGraphNodes = new ArrayList<>();
        subGraphNodes.addAll(sourceNodes);
        subGraphNodes.addAll(targetNodes);

        Graph subGraph = new Graph(subGraphNodes, subGraphEdges);
        ArrayList<Node> independentNodes = subGraph.getIndependentNodes();
        return subtractSet(independentNodes, sourceNodes);
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

    private ArrayList<Node> getLastNodesFromGroup(Group group) {
        return group.getSequences()
                .stream()
                .map(Sequence::getLastNode)
                .collect(Collectors.toCollection(ArrayList::new));
    }

    private boolean isExistNodeInArray(ArrayList<Node> nodeList, String nodeId) {
        return nodeList
                .stream()
                .anyMatch(item -> item.getId().equals(nodeId));
    }

    private ArrayList<Node> subtractSet(ArrayList<Node> source, ArrayList<Node> target) {
        return source
                .stream()
                .filter(e -> target.stream().noneMatch(item -> item.getId().equals(e.getId())))
                .collect(Collectors.toCollection(ArrayList::new));
    }
}
