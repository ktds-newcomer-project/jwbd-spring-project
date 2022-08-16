package com.ktds.kxam.repo;

import com.ktds.kxam.entity.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

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
}
