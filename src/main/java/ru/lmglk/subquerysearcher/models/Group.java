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

    public Group() {
        sequences = new ArrayList<>();
    }

    public Group(Group group) {
        super(group.getId());
        sequences = group.getSequences()
                .stream()
                .map(Sequence::new)
                .collect(Collectors.toCollection(ArrayList::new));
    }

    public void addSequence(Sequence sequence) {
        sequences.add(sequence);
    }

    public void addSequence(Node node) {
        sequences.add(new Sequence(node));
    }

    public void removeSequence(Sequence sequence) {
        sequences.remove(sequence);
    }

    @JsonIgnore
    public ArrayList<Node> getNodes() {
        return this.sequences
                .stream()
                .flatMap(sequence -> sequence.getNodes().stream())
                .collect(Collectors.toCollection(ArrayList::new));
    }

    public Sequence getSequence(int index) {
        return this.sequences.get(index);
    }

    @JsonIgnore
    public int size() {
        return this.sequences.size();
    }
}
