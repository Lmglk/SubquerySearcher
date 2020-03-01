package ru.lmglk.subquerysearcher.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
@AllArgsConstructor
public class GetScheduleRequest {

    private Graph graph;

    private ArrayList<ReplicationItem> replicationTable;
}
