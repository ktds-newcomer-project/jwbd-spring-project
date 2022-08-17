package com.ktds.kxam.service;

import com.ktds.kxam.dto.MemberProblemDTO;
import com.ktds.kxam.entity.Member;
import com.ktds.kxam.entity.MemberProblem;
import com.ktds.kxam.entity.Problem;
import com.ktds.kxam.exception.ApiMessageException;
import com.ktds.kxam.repo.MemberProblemRepo;
import com.ktds.kxam.repo.MemberRepo;
import com.ktds.kxam.repo.ProblemRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberProblemService {

    private final MemberProblemRepo memberProblemRepo;
    private final ProblemRepo problemRepo;
    private final MemberRepo memberRepo;

    public void saveMemberProblem(MemberProblemDTO memberProblemDTO){
        Member member = memberRepo.findMemberBySabun(memberProblemDTO.getSabun()).orElseThrow(()->new ApiMessageException("사용자를 찾을 수 없습니다."));
        Problem problem = problemRepo.findById(memberProblemDTO.getPid()).orElseThrow(()->new ApiMessageException("문제를 찾을 수 없습니다."));
        MemberProblem memberProblem = MemberProblem.builder()
                .member(member)
                .problem(problem)
                .userAnswer(memberProblemDTO.getUserAnswer())
                .isCollect(problem.getAnswer() == memberProblemDTO.getUserAnswer()? true:false)
                .build();
        MemberProblem result = memberProblemRepo.save(memberProblem);
        if(result == null) throw new ApiMessageException("저장에 실패하였습니다.");
    }

    public List<MemberProblemDTO> findMemberProblemBySabunAndTest(String sabun, Long tid){
        List<MemberProblem> memberProblemList = memberProblemRepo.findMemberProblemsBySabunAndTestId(sabun, tid);
        if(memberProblemList.size() == 0) throw new ApiMessageException("문제 조회에 실패했습니다.");
        List<MemberProblemDTO> result = new ArrayList<>();
        for(MemberProblem mp : memberProblemList)
            result.add(MemberProblemDTO.of(mp));
        return result;
    }

    public List<MemberProblemDTO> findMemberProblemBySabun(String sabun){
        List<MemberProblem> memberProblemList = memberProblemRepo.findMemberProblemsBySabun(sabun);
        if(memberProblemList.size() == 0) throw new ApiMessageException("문제 조회에 실패했습니다.");
        List<MemberProblemDTO> result = new ArrayList<>();
        for(MemberProblem mp : memberProblemList)
            result.add(MemberProblemDTO.of(mp));
        return result;
    }

    public List<MemberProblemDTO> findMemberProblemByProblem(Long pid){
        List<MemberProblem> memberProblemList = memberProblemRepo.findMemberProblemsByProblem(pid);
        if(memberProblemList.size() == 0) throw new ApiMessageException("문제 조회에 실패했습니다.");
        List<MemberProblemDTO> result = new ArrayList<>();
        for(MemberProblem mp : memberProblemList)
            result.add(MemberProblemDTO.of(mp));
        return result;
    }
}