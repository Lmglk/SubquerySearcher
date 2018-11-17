package ru.lmglk.subquerysearcher.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.lmglk.subquerysearcher.models.Edge;
import ru.lmglk.subquerysearcher.models.Graph;
import ru.lmglk.subquerysearcher.models.OptimizationData;
import ru.lmglk.subquerysearcher.models.ScheduleResult;
import ru.lmglk.subquerysearcher.services.GraphService;

import java.util.ArrayList;

@Controller
@RequestMapping(value = "api/graph")
@CrossOrigin(origins = "http://localhost:4200")
public class GraphController {

    @Autowired
    GraphService graphService;

    @ResponseBody
    @RequestMapping(value = "/loadGraph", method = RequestMethod.POST)
    public ResponseEntity uploadFile(@RequestParam("file") MultipartFile file) {
        Graph graph = this.graphService.readFile(file);
        return (graph != null)
                ? ResponseEntity.ok(graph)
                : ResponseEntity.badRequest().body("Incorrect file.");
    }

    @ResponseBody
    @RequestMapping(value = "/getSchedule", method = RequestMethod.POST)
    public ResponseEntity getSchedule(@RequestBody ArrayList<Edge> edgeList) {
        ScheduleResult result = this.graphService.generateSchedule(edgeList);
        return (result != null)
                ? ResponseEntity.ok(result)
                : ResponseEntity.badRequest().body("Calculation error. The graph may contain loops.");
    }

    @ResponseBody
    @RequestMapping(value = "/optimizeSchedule", method = RequestMethod.POST)
    public ScheduleResult optimizeSchedule(@RequestBody OptimizationData optimizationData) {
        return this.graphService.optimizeSchedule(optimizationData);
    }
}
