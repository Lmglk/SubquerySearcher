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
            while ((str = bufferedReader.readLine()) != null)
            {
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
}
