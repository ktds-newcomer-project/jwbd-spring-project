package org.zerock.sampleapi01.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.zerock.sampleapi01.entity.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long> {

}
