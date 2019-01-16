package ru.lmglk.subquerysearcher.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
@AllArgsConstructor
public class Statistics {

    private int totalBubbles;

    private int hardBubbles;

    private int width;

    private int height;

    public Statistics(ArrayList<Group> groups) {
        this.height = groups.size();
        this.width = this.calcWeight(groups);
        this.totalBubbles = calcTotalBubbles(groups, this.width);
        this.hardBubbles = calcHardBubbles(groups, this.width);
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
}
