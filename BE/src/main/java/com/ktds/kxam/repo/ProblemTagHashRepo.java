package com.ktds.kxam.repo;

import com.ktds.kxam.entity.ProblemTagHash;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProblemTagHashRepo extends JpaRepository<ProblemTagHash, Long> {

    @Query("select count(pth) from ProblemTagHash pth where pth.problem.pid = :pid and pth.tag.tagId = :tagId")
    int countProblemTagHashByProblemAndTag(@Param("pid")Long pid, @Param("tagId")Long tagId);
}
