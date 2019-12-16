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
public class Group extends Entity {

    private ArrayList<Sequence> sequences;

    private int time;

    public Group() {
        sequences = new ArrayList<>();
    }

    public Group(Group group) {
        super(group.getId());
        sequences = group.getSequences()
                .stream()
                .map(Sequence::new)
                .collect(Collectors.toCollection(ArrayList::new));
        time = calcTime();
    }

    public Group(ArrayList<Sequence> sequences) {
        this.sequences = sequences;
        time = calcTime();
    }

    public void addSequence(Sequence sequence) {
        sequences.add(sequence);
        time = calcTime();
    }

    public void addSequence(Node node) {
        sequences.add(new Sequence(node));
        time = calcTime();
    }

    public void addNodeToSequence(Sequence sequence, Node node) {
        sequence.addNode(node);
        time = calcTime();
    }

    public void removeSequence(Sequence sequence) {
        sequences.remove(sequence);
        time = calcTime();
    }

    public void removeNode(Node node) {
        Sequence findSequence = sequences
                .stream()
                .filter(sequence -> sequence.getNodes().contains(node.getId()))
                .findFirst()
                .orElse(null);

        if (findSequence == null) return;

        findSequence.removeNode(node);
        if (findSequence.size() == 0)
            sequences.remove(findSequence);
        time = calcTime();
    }

    @JsonIgnore
    public ArrayList<String> getNodes() {
        return this.sequences
                .stream()
                .flatMap(sequence -> sequence.getNodes().stream())
                .collect(Collectors.toCollection(ArrayList::new));
    }

    public Sequence getSequence(int index) {
        return this.sequences.get(index);
    }

    @JsonIgnore
    public ArrayList<Sequence> getSequenceWithMinTime() {
        int minTime = sequences
                .stream()
                .mapToInt(Sequence::getTime)
                .min()
                .orElse(0);

        return sequences
                .stream()
                .filter(sequence -> sequence.getTime() == minTime)
                .collect(Collectors.toCollection(ArrayList::new));
    }

    @JsonIgnore
    public int size() {
        return this.sequences.size();
    }

    private int calcTime() {
        return time = sequences
                .stream()
                .mapToInt(Sequence::getTime)
                .max()
                .orElse(0);
    }
}
