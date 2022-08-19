package org.zerock.sampleapi01.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.zerock.sampleapi01.dto.PageRequestDTO;
import org.zerock.sampleapi01.dto.PageResponseDTO;
import org.zerock.sampleapi01.dto.TodoDTO;
import org.zerock.sampleapi01.entity.Todo;
import org.zerock.sampleapi01.repository.TodoRepository;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log4j2
public class TodoServiceImpl implements TodoService{

    private final ModelMapper modelMapper;
    private final TodoRepository todoRepository;

    @Override
    public TodoDTO register(TodoDTO todoDTO) {

        Todo todo = modelMapper.map(todoDTO, Todo.class);

        Todo result = todoRepository.save(todo);

        TodoDTO resultDTO = modelMapper.map(result, TodoDTO.class );

        return resultDTO;
    }

    @Override
    public PageResponseDTO<TodoDTO> getList(PageRequestDTO pageRequestDTO) {

        Pageable pageable = PageRequest.of(pageRequestDTO.getPage() -1,
                pageRequestDTO.getSize(),
                Sort.by("tno").descending());

        Page<Todo> result = todoRepository.findAll(pageable);

        return PageResponseDTO.<TodoDTO>withAll()
                .dtoList(result.getContent().stream().map(todo -> modelMapper.map(todo, TodoDTO.class)).collect(Collectors.toList()))
                .total((int) result.getTotalElements())
                .pageRequestDTO(pageRequestDTO)
                .build();

    }

    @Override
    public TodoDTO get(Long tno) {

        Optional<Todo> result = todoRepository.findById(tno);

        Todo todo = result.orElseThrow();

        return modelMapper.map(todo, TodoDTO.class);
    }

    @Override
    public TodoDTO modify(TodoDTO todoDTO) {

        Optional<Todo> result = todoRepository.findById(todoDTO.getTno());

        Todo todo = result.orElseThrow();

        todo.change(todo.getTitle(), todoDTO.getDueDate(), todoDTO.isComplete());

        todoRepository.save(todo);

        return modelMapper.map(todo, TodoDTO.class);
    }
}














