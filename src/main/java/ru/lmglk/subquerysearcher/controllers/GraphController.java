package ru.lmglk.subquerysearcher.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.lmglk.subquerysearcher.models.Graph;
import ru.lmglk.subquerysearcher.services.FileService;

@Controller
@RequestMapping(value = "api/file")
@CrossOrigin(origins = "http://localhost:4200")
public class GraphController {

    @Autowired
    FileService fileService;

    @ResponseBody
    @RequestMapping(value = "/loadFile", method = RequestMethod.POST)
    public Graph uploadFile(@RequestParam("file") MultipartFile file) {
        return this.fileService.readFile(file);
    }
}
