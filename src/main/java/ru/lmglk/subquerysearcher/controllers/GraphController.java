package ru.lmglk.subquerysearcher.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.lmglk.subquerysearcher.models.Edge;
import ru.lmglk.subquerysearcher.models.Graph;
import ru.lmglk.subquerysearcher.services.FileService;

import java.util.ArrayList;
import java.util.HashSet;

@Controller
@RequestMapping(value = "api/graph")
@CrossOrigin(origins = "http://localhost:4200")
public class GraphController {

    @Autowired
    FileService fileService;

    @ResponseBody
    @RequestMapping(value = "/loadGraph", method = RequestMethod.POST)
    public Graph uploadFile(@RequestParam("file") MultipartFile file) {
        return this.fileService.readFile(file);
    }

    @ResponseBody
    @RequestMapping(value = "/getSchedule", method = RequestMethod.POST)
    public ArrayList<HashSet<String>> getSchedule(@RequestBody ArrayList<Edge> edgeList) {
        return this.fileService.generateSchedule(edgeList);
    }
}
