package ru.lmglk.subquerysearcher.models;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
class Entity {

    private String id;

    Entity() {
        this.id = UUID.randomUUID().toString();
    }
}
