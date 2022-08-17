package com.ktds.kxam.repo;

import com.ktds.kxam.entity.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TestRepo extends JpaRepository<Test, Long>{
    @Modifying
    @Transactional
    @Query("update Test t set t.startTime =:startTime where t.tid = :tid ")
    void updateStartTime(@Param("tid") Long tid, @Param("startTime")LocalDateTime startTime);

    @Modifying
    @Transactional
    @Query("update Test t set t.endTime =:endTime where t.tid = :tid ")
    void updateEndTime(@Param("tid") Long tid, @Param("endTime")LocalDateTime endTime);

    @Modifying
    @Transactional
    @Query("update Test t set t.validateKey = :validateKey where t.tid = :tid")
    void updateValidateKey(@Param("tid") Long tid, @Param("validateKey") String validateKey);

    @Query("select t.validateKey from Test t where t.tid = :tid")
    String findValidateKeyByTest(@Param("tid")Long tid);

    @Query("select distinct mp.problem.test.tid from MemberProblem mp where mp.member.sabun=:sabun")
    List<Long> findByMember(@Param("sabun") String sabun);

    @Query("select distinct mp.member.sabun from MemberProblem mp where mp.problem.test.tid = :tid")
    List<String> findMemberByTest(@Param("tid") Long tid);

    @Query("select mp.problem.pid from MemberProblem mp where mp.isCollect = true and mp.member.sabun = :sabun and mp.problem.test.tid=:tid")
    List<Long> findProblemByMemberAndTest(@Param("sabun") String sabun, @Param("tid") Long tid);

    @Query("select p.point from Problem p where p.pid=:pid")
    int findPointByProblem(@Param("pid") Long pid);
}
