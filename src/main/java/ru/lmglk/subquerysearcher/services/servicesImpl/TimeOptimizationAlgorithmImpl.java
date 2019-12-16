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
    public ArrayList<Group> scheduleOptimizationByTime(OptimizationData data) {
        ArrayList<Group> schedule = data.getSchedule();
        Graph graph = data.getGraph();

        for (int i = 0; i < schedule.size() - 1; i++) {
            Group sourceGroup = schedule.get(i);
            Group targetGroup = schedule.get(i + 1);

            boolean isCanMove = true;
            while (isCanMove) {
                if (isAlignGroup(sourceGroup)) break;

                if (targetGroup.size() == 0)
                    targetGroup = schedule.get(i + 1);

                ArrayList<Sequence> minSequenceList = sourceGroup.getSequenceWithMinTime();

                for (Sequence minSequence : minSequenceList) {
                    ArrayList<String> allowedNodesToAttach = getAllowedNodesToAttach(minSequence.getLastNode(), sourceGroup, targetGroup, graph);

                    for (String targetNodeId : allowedNodesToAttach) {
                        isCanMove = isCanMoveNode(minSequence.getLastNode(), targetNodeId, sourceGroup, graph);
                        if (isCanMove) {
                            Node targetNode = graph.getNodes()
                                    .stream()
                                    .filter(node -> node.getId().equals(targetNodeId))
                                    .findFirst()
                                    .orElse(null);
                            targetGroup.removeNode(targetNode);

                            if (targetGroup.size() == 0) {
                                schedule.remove(targetGroup);
                            }
                            sourceGroup.addNodeToSequence(minSequence, targetNode);
                            break;
                        }
                    }

                    if (!isCanMove) break;
                }
            }
        }

        return schedule;
    }

    private boolean isAlignGroup(Group group) {
        return group.getSequences()
                .stream()
                .allMatch(sequence -> sequence.getTime() == group.getTime());
    }

    private ArrayList<String> getAllowedNodesToAttach(String sourceNodeId, Group sourceGroup, Group targetGroup, Graph graph) {
        return Stream
                .concat(
                        getTargetNodesBindedToNode(targetGroup, sourceNodeId, graph).stream(),
                        getIndependentTargetNodesForSubGraph(sourceGroup, targetGroup, graph).stream()
                )
                .collect(Collectors.toCollection(ArrayList::new));
    }

    private boolean isCanMoveNode(String sourceNodeId, String targetNodeId, Group group, Graph graph) {
        return getSourceNodesBindedToTargetNode(group, targetNodeId, graph)
                .stream()
                .filter(node -> !node.equals(sourceNodeId))
                .collect(Collectors.toCollection(ArrayList::new))
                .isEmpty();
    }

    private ArrayList<String> getTargetNodesBindedToNode(Group group, String nodeId, Graph graph) {
        return group.getNodes()
                .stream()
                .filter(targetNode -> graph.isExistEdge(nodeId, targetNode))
                .collect(Collectors.toCollection(ArrayList::new));

    }

    private ArrayList<String> getIndependentTargetNodesForSubGraph(Group firstGroup, Group secondGroup, Graph graph) {
        ArrayList<Node> graphNodes = graph.getNodes();

        ArrayList<String> sourceNodes = getLastNodesFromGroup(firstGroup);
        ArrayList<String> targetNodes = getLastNodesFromGroup(secondGroup);

        ArrayList<Edge> subGraphEdges = graph.getEdges()
                .stream()
                .filter(edge -> isExistNodeInArray(sourceNodes, edge.getSourceId()) && isExistNodeInArray(targetNodes, edge.getTargetId()))
                .collect(Collectors.toCollection(ArrayList::new));

        ArrayList<String> subGraphNodeIds = new ArrayList<>();
        subGraphNodeIds.addAll(sourceNodes);
        subGraphNodeIds.addAll(targetNodes);

        ArrayList<Node> subGraphNodes = subGraphNodeIds.stream().map(nodeId ->
                graphNodes.stream().filter(item -> item.getId().equals(nodeId)).findFirst().orElse(null)
        ).collect(Collectors.toCollection(ArrayList::new));

        Graph subGraph = new Graph(subGraphNodes, subGraphEdges);
        ArrayList<String> independentNodes = subGraph.getIndependentNodes().stream().map(Node::getId).collect(Collectors.toCollection(ArrayList::new));
        return subtractSet(independentNodes, sourceNodes);
    }

    private ArrayList<String> getSourceNodesBindedToTargetNode(Group group, String targetNodeId, Graph graph) {
        ArrayList<String> lastNodes = group.getSequences()
                .stream()
                .map(Sequence::getLastNode)
                .collect(Collectors.toCollection(ArrayList::new));

        return lastNodes
                .stream()
                .filter(sourceNode -> graph.isExistEdge(sourceNode, targetNodeId))
                .collect(Collectors.toCollection(ArrayList::new));
    }

    private ArrayList<String> getLastNodesFromGroup(Group group) {
        return group.getSequences()
                .stream()
                .map(Sequence::getLastNode)
                .collect(Collectors.toCollection(ArrayList::new));
    }

    private boolean isExistNodeInArray(ArrayList<String> nodeList, String nodeId) {
        return nodeList
                .stream()
                .anyMatch(item -> item.equals(nodeId));
    }

    private ArrayList<String> subtractSet(ArrayList<String> sourceIds, ArrayList<String> targetIds) {
        return sourceIds
                .stream()
                .filter(e -> targetIds.stream().noneMatch(item -> item.equals(e)))
                .collect(Collectors.toCollection(ArrayList::new));
    }
}
