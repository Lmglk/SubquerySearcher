package ru.lmglk.subquerysearcher.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Statistic {

    private int totalBubbles;

    private int hardBubbles;

    private int width;

    private int height;

    private int nodes;

    private int time;

    public Statistic(ArrayList<Group> groups) {
        this.height = groups.size();
        this.width = this.calcWeight(groups);
        this.totalBubbles = calcTotalBubbles(groups, this.width);
        this.nodes = calcNodes(groups);
        this.hardBubbles = calcHardBubbles(groups, this.width);
        this.time = calcTime(groups);
    }

    public Statistic(Statistic statistic) {
        this(statistic.totalBubbles, statistic.hardBubbles, statistic.width, statistic.height, statistic.nodes, statistic.time);
    }

    private int calcWeight(ArrayList<Group> groups) {
        return groups
                .stream()
                .mapToInt(Group::size)
                .max()
                .orElse(0);
    }

    private int calcTotalBubbles(ArrayList<Group> groups, int maxSize) {
        return groups.stream()
                .mapToInt(Group::size)
                .map(gropSize -> maxSize - gropSize)
                .sum();
    }

    private int calcHardBubbles(ArrayList<Group> groups, int maxSize) {
        Group lastFullyGroup = groups
                .stream()
                .filter(group -> group.size() == maxSize)
                .reduce((a, b) -> b)
                .orElse(null);

        int hardBubbles = 0;
        for (Group group : groups) {
            if (group == lastFullyGroup) break;
            hardBubbles += maxSize - group.size();
        }

        return hardBubbles;
    }

    private int calcNodes(ArrayList<Group> groups) {
        return groups.stream().mapToInt(group -> (int) group.getSequences()
                .stream()
                .mapToInt(sequence -> sequence.getNodes().size())
                .count()
        ).sum();
    }

    private int calcTime(ArrayList<Group> groups) {
        return groups.stream().mapToInt(Group::getTime).sum();
    }
}
