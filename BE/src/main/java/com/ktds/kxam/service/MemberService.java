package com.ktds.kxam.service;


import com.ktds.kxam.dto.MemberDTO;
import com.ktds.kxam.dto.req.LoginReqDTO;
import com.ktds.kxam.dto.req.MemberSaveReqDTO;
import com.ktds.kxam.dto.res.LoginResDTO;
import com.ktds.kxam.entity.Member;
import com.ktds.kxam.entity.MemberRole;
import com.ktds.kxam.exception.ApiMessageException;
import com.ktds.kxam.repo.MemberRepo;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Log4j2
public class MemberService {

    private final MemberRepo memberRepo;

    private static final int pageCnt = 5;

    @Transactional
    public void saveMember(MemberSaveReqDTO dto) {

        System.out.println("****************************************");
        System.out.println("****************************************");

        MemberRole role = MemberRole.USER;
        Member tmp = Member.builder()
                .name(dto.getName())
                .sabun(dto.getSabun())
                .mpw(dto.getMpw())
                .build();
        tmp.addRole(role);
        Member saveResult = memberRepo.save(tmp);
        if (saveResult == null)
            throw new ApiMessageException("문제 등록에 실패하였습니다.");
    }

    public List<LoginResDTO> doLogin(LoginReqDTO dto) {
        Optional<Member> result = memberRepo.findFirstMemberBySabun(dto.getId());

        if (result.isEmpty()) {
            throw new ApiMessageException("아이디가 없습니다.");
        }

        Member m = result.get();

        LoginResDTO reponse = LoginResDTO.builder().build();
        if (m.getMpw().equals(dto.getPwd())) {
            reponse.setName(m.getName());
            reponse.setSabun(m.getSabun());
            reponse.setType(m.getRoleSet());
        } else {
            throw new ApiMessageException("비밀번호가 틀렸습니다.");
        }

        // NOTE: 왜 굳이 List에 감싸 던지냐면 감싸져있는게 프론트단에서 파싱하는게 편해져서.
        List<LoginResDTO> result2 = new ArrayList<>();
        result2.add(reponse);
        return result2;
    }

    public List<MemberDTO> allListNotPage() {
        List<Member> membermList = memberRepo.findAll();
        List<MemberDTO> result = new ArrayList<>();

        for (Member m : membermList) {
            result.add(MemberDTO.of(m));
        }
        return result;
    }

    public List<MemberDTO> allList(int page) {
        List<Member> membermList = memberRepo.findAll();
        List<MemberDTO> result = new ArrayList<>();
        // 1보다 작은 수가 들어오면 아래 Logic을 통과할 수 없음.
        int maxpage = membermList.size() / pageCnt;

        page = page > maxpage ? maxpage : page;
        page = page < 1 ? 1 : page;

        int start = 0 + (pageCnt * (page - 1));
        int end = pageCnt * page;
        int fullsize = membermList.size() - 1;

        for (; start < end; start++) {
            if (start == fullsize)
                break;
            System.out.println(start + "/" + end + "/" + fullsize);
            result.add(MemberDTO.of(membermList.get(start)));
        }
        return result;
    }
}
