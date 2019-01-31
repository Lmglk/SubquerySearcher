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

    private Metrics metrics;

    public Schedule() {
        groups = new ArrayList<>();
    }

    public Schedule(Schedule schedule) {
        groups = schedule.getGroups()
                .stream()
                .map(Group::new)
                .collect(Collectors.toCollection(ArrayList::new));
        metrics = new Metrics(schedule.getMetrics());
    }

    public void createMetrics() {
        metrics = new Metrics(this.groups);
    }

    public void addGroup(Group group) {
        groups.add(group);
    }

    @JsonIgnore
    public Group getGroup(int index) {
        return groups.get(index);
    }

    public void removeNode(Node node, Group group) {
        group.removeNode(node);

        if (group.size() == 0) {
            groups.remove(group);
        }
    }
}
