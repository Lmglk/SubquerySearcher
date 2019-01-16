package ru.lmglk.subquerysearcher.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
@AllArgsConstructor
public class Schedule {

    private ArrayList<Group> groups;

    private Statistics statistics;

    public Schedule() {
        groups = new ArrayList<>();
    }

    public void addGroup(Group group) {
        groups.add(group);
    }

    public void createStatistic() {
        statistics = new Statistics(this.groups);
    }
}
