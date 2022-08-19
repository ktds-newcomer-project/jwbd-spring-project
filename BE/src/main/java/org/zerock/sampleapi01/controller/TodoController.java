package org.zerock.sampleapi01.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;
import org.zerock.sampleapi01.dto.PageRequestDTO;
import org.zerock.sampleapi01.dto.PageResponseDTO;
import org.zerock.sampleapi01.dto.TodoDTO;
import org.zerock.sampleapi01.entity.Todo;
import org.zerock.sampleapi01.repository.TodoRepository;
import org.zerock.sampleapi01.service.TodoService;

import javax.management.modelmbean.ModelMBean;
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
