package com.ktds.kxam.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ktds.kxam.entity.Member;

public interface MemberRepo2 extends JpaRepository<Member, String> {
    Optional<Member> findFirstMemberBySabun(long sabun);
}
