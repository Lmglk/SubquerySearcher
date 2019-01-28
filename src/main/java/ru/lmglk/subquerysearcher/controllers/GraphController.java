package ru.lmglk.subquerysearcher.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.lmglk.subquerysearcher.models.*;
import ru.lmglk.subquerysearcher.services.GraphService;
import ru.lmglk.subquerysearcher.services.TimeOptimizationAlgorithm;
import ru.lmglk.subquerysearcher.services.WidthOptimizationAlgorithm;

@Controller
@RequestMapping(value = "api/graph")
@CrossOrigin(origins = "http://localhost:4200")
public class GraphController {

    @Autowired
    private GraphService graphService;

    @Autowired
    private TimeOptimizationAlgorithm timeOptimizationAlgorithm;

    @Autowired
    private WidthOptimizationAlgorithm widthOptimizationAlgorithm;

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
    public ResponseEntity getSchedule(@RequestBody Graph graph) {
        Schedule schedule = this.graphService.generateSchedule(graph);
        return (schedule != null)
                ? ResponseEntity.ok(schedule)
                : ResponseEntity.badRequest().body("Calculation error. The graph may contain loops.");
    }

    @ResponseBody
    @RequestMapping(value = "/optimizeScheduleWithoutTimestamp", method = RequestMethod.POST)
    public Schedule optimizeScheduleWithoutTimestamp(@RequestBody OptimizationData data) {
        return this.widthOptimizationAlgorithm.scheduleOptimizationByWidth(data);
    }

    @ResponseBody
    @RequestMapping(value = "/optimizeScheduleWithTimestamp", method = RequestMethod.POST)
    public Schedule optimizeScheduleWithTimestamp(@RequestBody OptimizationData data) {
        return this.timeOptimizationAlgorithm.scheduleOptimizationByTime(data);
    }
}
