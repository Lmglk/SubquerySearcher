package ru.lmglk.subquerysearcher.services;

import org.springframework.web.multipart.MultipartFile;
import ru.lmglk.subquerysearcher.models.Edge;
import ru.lmglk.subquerysearcher.models.Graph;

import java.util.ArrayList;
import java.util.HashSet;

public interface FileService {

    Graph readFile(MultipartFile file);

    ArrayList<HashSet<String>> generateSchedule(ArrayList<Edge> edgeList);
}
