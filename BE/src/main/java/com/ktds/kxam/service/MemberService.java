package com.ktds.kxam.service;

import com.ktds.kxam.dto.MemberDTO;
import com.ktds.kxam.entity.Member;
import com.ktds.kxam.repo.MemberRepo;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Log4j2
public class MemberService {

    private final MemberRepo memberRepo;

    private static final int pageCnt = 5;

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
