package com.ktds.kxam.service;

import com.ktds.kxam.dto.ProblemDTO;
import com.ktds.kxam.dto.res.ProblemResDTO;
import com.ktds.kxam.entity.Problem;
import com.ktds.kxam.exception.ApiMessageException;
import com.ktds.kxam.repo.ProblemRepo;
import com.ktds.kxam.repo.TestRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
@Transactional
public class ProblemService {

    private final ProblemRepo problemRepo;
    private final TestRepo testRepo;

    @Transactional
    public void saveProblem(ProblemDTO problemDTO){
        Problem problem = Problem.builder()
                .answer(problemDTO.getAnswer())
                .contents(problemDTO.getContents())
                .title(problemDTO.getTitle())
                .test(testRepo.findById(problemDTO.getTid()).orElseThrow(()->new ApiMessageException("시험이 존재하지 않습니다.")))
                .items(problemDTO.getItems())
                .point(problemDTO.getPoint())
                .build();
        Problem saveResult = problemRepo.save(problem);
        if(saveResult == null) throw new ApiMessageException("문제 등록에 실패하였습니다.");
    }

    @Transactional
    public void updateIsDelete(Long pid, String reasonOfDelete){
        Problem problem = problemRepo.findById(pid).orElseThrow(()-> new ApiMessageException("문제가 존재하지 않습니다."));
        if(!problem.isDelete()){
            problemRepo.updateIsDelete(pid);
            problemRepo.updateReasonOfDelete(pid, reasonOfDelete);
        } else{
            problemRepo.updateIsDelete(pid);
            problemRepo.updateReasonOfDelete(pid, "");
        }
    }

    @Transactional
    public void updateAnswer(Long pid, String answer){
        problemRepo.updateAnswer(pid, answer);
        Problem problem = problemRepo.findById(pid).orElseThrow(()->new ApiMessageException("문제가 존재하지 않습니다."));
        if(!problem.getAnswer().equals(answer))
            throw new ApiMessageException("정답 수정에 실패하였습니다.");
    }

    @Transactional
    public void updateItems(Long pid, String items){
        problemRepo.updateItems(pid, items);
        Problem problem = problemRepo.findById(pid).orElseThrow(()->new ApiMessageException("문제가 존재하지 않습니다."));
        if(!problem.getItems().equals(items))
            throw new ApiMessageException("보기 수정에 실패하였습니다.");
    }

    public List<ProblemResDTO> findProblemsByTestId(Long tid, String validateKey){
        String originValidateKey = testRepo.findValidateKeyByTest(tid);
        if(originValidateKey!=null && !originValidateKey.equals(validateKey)) throw new ApiMessageException("비밀번호가 일치하지 않습니다.");
        List<Problem> problemList = problemRepo.findProblemsByTestId(tid);
        if(problemList.size() == 0) throw new ApiMessageException("등록된 문제를 찾을 수 없습니다.");
        List<ProblemResDTO> result = new ArrayList<>();
        for(Problem p : problemList)
            result.add(ProblemResDTO.of(p));
        return result;
    }

    public List<ProblemResDTO> findProblemsByTag(Long tagId){
        List<Problem> problemList = problemRepo.findProblemsByTagId(tagId);
        if(problemList.size() == 0) throw new ApiMessageException("등록된 문제를 찾을 수 없습니다.");
        List<ProblemResDTO> result = new ArrayList<>();
        for(Problem p : problemList)
            result.add(ProblemResDTO.of(p));
        return result;
    }
}
