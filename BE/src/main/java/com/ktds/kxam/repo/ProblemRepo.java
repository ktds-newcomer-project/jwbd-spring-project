package com.ktds.kxam.repo;

import com.ktds.kxam.entity.Problem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
public interface ProblemRepo extends JpaRepository<Problem, Long> {
    @Modifying
    @Transactional
    @Query("update Problem p set p.answer =:answer where p.pid = :pid ")
    void updateAnswer(@Param("pid") Long pid, @Param("answer") String answer);

    @Modifying
    @Transactional
    @Query("update Problem p set p.items =:items where p.pid = :pid ")
    void updateItems(@Param("pid") Long pid, @Param("items") String items);

    @Query("select p from Problem p where p.test.tid = :testId")
    List<Problem> findProblemsByTestId(@Param("testId") Long testId);

    @Query("select pth.problem from ProblemTagHash pth where pth.tag.tagId = :tagId")
    List<Problem> findProblemsByTagId(@Param("tagId") Long tagId);
}
