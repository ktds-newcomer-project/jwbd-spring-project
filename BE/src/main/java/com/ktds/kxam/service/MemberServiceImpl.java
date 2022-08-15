package com.ktds.kxam.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.ktds.kxam.entity.Member;
import com.ktds.kxam.model.LoginReponseVO;
import com.ktds.kxam.model.LoginRquestVO;
import com.ktds.kxam.repo.MemberRepo2;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService {
    private final MemberRepo2 repo;

    @Override
    public LoginReponseVO doLogin(LoginRquestVO vo) {
        Long sabun = 0L;
        try {
            sabun = Long.parseLong(vo.getId());
        } catch (Exception e1) {
            // pass
            // 숫자가 아닌 값이 들어온 상황
        }
        Optional<Member> result = repo.findFirstMemberBySabun(sabun);
        LoginReponseVO reponse = LoginReponseVO.builder().build();
        if (result.isEmpty()) {
            return reponse;
        }
        Member m = result.get();
        if (m.getMpw().equals(vo.getPwd())) {
            reponse.setInfo("Sucess");
            reponse.setName(m.getName());
        }
        return reponse;
    }

}
