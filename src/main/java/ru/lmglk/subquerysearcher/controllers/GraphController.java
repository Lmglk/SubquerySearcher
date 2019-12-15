package ru.lmglk.subquerysearcher.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.lmglk.subquerysearcher.models.*;
import ru.lmglk.subquerysearcher.services.GraphService;
import ru.lmglk.subquerysearcher.services.TimeOptimizationAlgorithm;
import ru.lmglk.subquerysearcher.services.WidthOptimizationAlgorithm;

import java.util.ArrayList;

@Controller
@RequestMapping(value = "api/graph")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
public class GraphController {

    @Autowired
    private GraphService graphService;

    @Autowired
    private TimeOptimizationAlgorithm timeOptimizationAlgorithm;

    @Autowired
    private WidthOptimizationAlgorithm widthOptimizationAlgorithm;

    @ResponseBody
    @RequestMapping(value = "/separateNodes", method = RequestMethod.POST)
    public Graph separateNodes(@RequestBody SeparateNodesRequest req) {
        return this.graphService.separateNodes(req.getGraph(), req.getInfo());
    }

    @ResponseBody
    @RequestMapping(value = "/getSchedule", method = RequestMethod.POST)
    public ResponseEntity getSchedule(@RequestBody Graph graph) {
        ArrayList<Group> schedule = this.graphService.generateSchedule(graph);
        return (schedule != null)
                ? ResponseEntity.ok(schedule)
                : ResponseEntity.badRequest().body("Calculation error. The graph may contain loops.");
    }

    @ResponseBody
    @RequestMapping(value = "/optimizeSchedule", method = RequestMethod.POST)
    public ResponseEntity optimizeScheduleWithoutTimestamp(@RequestBody OptimizationData data, @RequestParam int mode) {
        switch (mode) {
            case 1:
                return ResponseEntity.ok(this.widthOptimizationAlgorithm.scheduleOptimizationByWidth(data));
            case 2:
                return ResponseEntity.ok(this.timeOptimizationAlgorithm.scheduleOptimizationByTime(data));

            default:
                return ResponseEntity.badRequest().body("Incorrect schedule optimization mode.");
        }
    }
}
