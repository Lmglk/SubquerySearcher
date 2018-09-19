package ru.lmglk.subquerysearcher.services.servicesImpl;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ru.lmglk.subquerysearcher.models.Edge;
import ru.lmglk.subquerysearcher.models.Graph;
import ru.lmglk.subquerysearcher.models.Node;
import ru.lmglk.subquerysearcher.services.FileService;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.stream.Collectors;

@Service
public class FileServiceImpl implements FileService {

    @Override
    public Graph readFile(MultipartFile file) {
        ArrayList<Edge> edges = new ArrayList<>();
        ArrayList<Node> nodes = new ArrayList<>();
        HashSet<String> tempNodes = new HashSet<>();
        try {
            InputStream inputStream = file.getInputStream();
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
            String str;
            long id = 1;
            while ((str = bufferedReader.readLine()) != null) {
                String arr[] = str.split(" ");
                edges.add(new Edge(id++, arr[0], arr[1]));
                tempNodes.add(arr[0]);
                tempNodes.add(arr[1]);
            }
            nodes = (ArrayList<Node>) tempNodes.stream().map(node -> new Node(node, node)).collect(Collectors.toList());
            bufferedReader.close();
            inputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return new Graph(nodes, edges);
    }

    @Override
    public ArrayList<HashSet<String>> generateSchedule(ArrayList<Edge> edgeList) {
        HashSet<String> group = new HashSet<>();
        HashSet<String> targetNodes = new HashSet<>();
        ArrayList<HashSet<String>> schedule = new ArrayList<>();

        HashSet<String> remainder = new HashSet<>();
        HashSet<String> oldRemainder;

        while (edgeList.size() > 0) {
            group.clear();
            targetNodes.clear();
            edgeList.forEach(item -> {
                group.add(item.getSource());
                targetNodes.add(item.getTarget());
            });
            oldRemainder = new HashSet<>(remainder);
            remainder = new HashSet<>(targetNodes);
            remainder.removeAll(group);
            group.removeAll(targetNodes);

            oldRemainder.removeAll(remainder);
            if (group.size() == 0)
                return null;

            if (oldRemainder.size() != 0)
                group.addAll(oldRemainder);
            schedule.add(new HashSet<>(group));
            edgeList = edgeList.stream()
                    .filter(e -> !group.contains(e.getSource()))
                    .collect(Collectors.toCollection(ArrayList::new));
        }
        if (group.size() != 0) {
            schedule.add(new HashSet<>(targetNodes));
        }

        return schedule;
    }
}
