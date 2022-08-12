package com.ktds.kxam.repo;

import com.ktds.kxam.entity.Member;
import com.ktds.kxam.entity.MemberProblem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberProblemRepo extends JpaRepository<MemberProblem, Long> {

    @Query("select mp from MemberProblem mp where mp.member.sabun=:sabun and mp.problem.test.tid=:tid")
    List<MemberProblem> findMemberProblemsBySabunAndTestId(@Param("sabun")String sabun, @Param("tid")Long tid);

    @Query("select mp from MemberProblem mp where mp.member.sabun = :sabun")
    List<MemberProblem> findMemberProblemsBySabun(@Param("sabun")String sabun);

    @Query("select mp from MemberProblem mp where mp.problem.pid = :pid")
    List<MemberProblem> findMemberProblemsByProblem(@Param("pid")Long pid);

    @Query("select mp.member from MemberProblem mp where mp.problem.test.tid = :tid")
    List<Member> findMembersByTest(@Param("tid")Long tid);
}
