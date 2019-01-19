package ru.lmglk.subquerysearcher.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
public class Schedule {

    private ArrayList<Group> groups;

    private Statistic statistic;

    public Schedule() {
        groups = new ArrayList<>();
    }

    public Schedule(Schedule schedule) {
        groups = schedule.getGroups()
                .stream()
                .map(Group::new)
                .collect(Collectors.toCollection(ArrayList::new));
        statistic = new Statistic(schedule.getStatistic());
    }

    public void createStatistic() {
        statistic = new Statistic(this.groups);
    }

    public void addGroup(Group group) {
        groups.add(group);
    }

    @JsonIgnore
    public Group getGroup(int index) {
        return groups.get(index);
    }
}
