package org.zerock.sampleapi01.service;

import org.zerock.sampleapi01.dto.PageRequestDTO;
import org.zerock.sampleapi01.dto.PageResponseDTO;
import org.zerock.sampleapi01.dto.TodoDTO;

import javax.transaction.Transactional;


@Transactional
public interface TodoService {

    TodoDTO register(TodoDTO todoDTO);

    PageResponseDTO<TodoDTO> getList(PageRequestDTO pageRequestDTO);

    TodoDTO get(Long tno);

    TodoDTO modify(TodoDTO tOdoDTO);

}
