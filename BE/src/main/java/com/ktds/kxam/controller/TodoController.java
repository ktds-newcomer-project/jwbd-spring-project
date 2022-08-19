package com.ktds.kxam.controller;

import com.ktds.kxam.dto.PageResponseDTO;
import com.ktds.kxam.dto.TodoDTO;
import com.ktds.kxam.service.TodoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;
import com.ktds.kxam.dto.PageRequestDTO;

import javax.transaction.Transactional;

@RestController
@RequestMapping("/api/todos/")
@RequiredArgsConstructor
@Transactional
@Log4j2
public class TodoController {

    private final TodoService service;

    @PostMapping("")
    public TodoDTO register(@RequestBody TodoDTO todoDTO){

        log.info(todoDTO );

        return service.register(todoDTO);
    }

    @GetMapping("/list")
    public PageResponseDTO<TodoDTO> list(PageRequestDTO pageRequestDTO){

        log.info("list...............");
        log.info(pageRequestDTO);
        return service.getList(pageRequestDTO);

    }

    @PutMapping("/{tno}")
    public TodoDTO modify(@PathVariable Long tno,  @RequestBody TodoDTO todoDTO){

        todoDTO.setTno(tno);

        return service.modify(todoDTO);

    }




}
