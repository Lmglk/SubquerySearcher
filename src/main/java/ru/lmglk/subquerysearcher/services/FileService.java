package ru.lmglk.subquerysearcher.services;

import org.springframework.web.multipart.MultipartFile;
import ru.lmglk.subquerysearcher.models.Graph;

public interface FileService {

    Graph readFile(MultipartFile file);
}
