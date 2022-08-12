package com.ktds.kxam.service;

import com.ktds.kxam.repo.MemberRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Log4j2
public class MemberService {
    private final MemberRepo memberRepo;


}
