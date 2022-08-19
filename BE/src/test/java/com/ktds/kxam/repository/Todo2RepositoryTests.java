package com.ktds.kxam.repository;

import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import com.ktds.kxam.entity.Todo2;

import javax.transaction.Transactional;
import java.util.stream.IntStream;

@SpringBootTest
@Log4j2
public class Todo2RepositoryTests {

    @Autowired
    private Todo2Repository repository;

    @Test
    public void testInserts() {

        IntStream.rangeClosed(1,30).forEach(i -> {
            Todo2 todo2 = Todo2.builder().title("AAAA"+i).build();

            for (int j = 0; j < 4; j++) {
                todo2.addOption(i +" option..."+j);
            }

            repository.save(todo2);
        });
    }

    @Transactional
    @Test
    public void testList() {

        Pageable pageable = PageRequest.of(0,10, Sort.by("tno").descending());

        Page<Todo2> result = repository.findAll(pageable);


        result.getContent().forEach(todo2 -> {
            log.info(todo2);
        });


    }
}
