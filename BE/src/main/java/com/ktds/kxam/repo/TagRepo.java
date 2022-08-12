package com.ktds.kxam.repo;

import com.ktds.kxam.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface TagRepo extends JpaRepository<Tag, Long> {

    int countTagsByTagName(String name);

    List<Tag> findTagsByTagNameContaining(String tagName);

    @Modifying
    @Transactional
    @Query("update Tag t set t.tagName =:tagName where t.tagId = :tagId ")
    void modifyTagName(@Param("tagId") Long tagId, @Param("tagName") String tagName);

    @Query("select pth.tag from ProblemTagHash pth where pth.problem.pid = :pid")
    List<Tag> findTagsByProblem(@Param("pid") Long pid);
}
