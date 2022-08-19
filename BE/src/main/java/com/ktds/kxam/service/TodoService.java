package com.ktds.kxam.service;

import com.ktds.kxam.dto.PageResponseDTO;
import com.ktds.kxam.dto.TodoDTO;
import com.ktds.kxam.dto.PageRequestDTO;

import javax.transaction.Transactional;


@Transactional
public interface TodoService {

    TodoDTO register(TodoDTO todoDTO);

    PageResponseDTO<TodoDTO> getList(PageRequestDTO pageRequestDTO);

    TodoDTO get(Long tno);

    TodoDTO modify(TodoDTO tOdoDTO);

}
