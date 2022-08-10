package com.ktds.kxam.repo;

import com.ktds.kxam.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface MemberRepo extends JpaRepository<Member, String> {
    Member findMemberBySubun(String sabun);

    @Modifying
    @Transactional
    @Query("update Member m set m.mpw =:mpw where m.sabun = :sabun ")
    void updatePassword(@Param("mpw") String password, @Param("sabun") String mid);


}
