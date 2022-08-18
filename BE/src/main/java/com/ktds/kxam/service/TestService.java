package com.ktds.kxam.service;

import com.ktds.kxam.dto.req.AnswerDTO;
import com.ktds.kxam.dto.req.SubmitReqDTO;
import com.ktds.kxam.dto.req.TestValidateKeyReqDTO;
import com.ktds.kxam.dto.res.TestResDTO;
import com.ktds.kxam.dto.TestDTO;
import com.ktds.kxam.entity.MemberProblem;
import com.ktds.kxam.entity.Problem;
import com.ktds.kxam.entity.Test;
import com.ktds.kxam.exception.ApiMessageException;
import com.ktds.kxam.repo.MemberProblemRepo;
import com.ktds.kxam.repo.MemberRepo;
import com.ktds.kxam.repo.ProblemRepo;
import com.ktds.kxam.repo.TestRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Log4j2
@Transactional
public class TestService {

    private final TestRepo testRepo;
    private final MemberProblemRepo memberProblemRepo;
    private final ProblemRepo problemRepo;
    private final MemberRepo memberRepo;

    @Transactional
    public void saveTest(TestDTO testDTO) {
        Test test = Test.builder()
                .author(testDTO.getAuthor())
                .cutLine(testDTO.getCutLine())
                .title(testDTO.getTitle())
                .startTime(testDTO.getStartTime())
                .endTime(testDTO.getEndTime())
                .validateKey((testDTO.getValidateKey()))
                .createdAt(LocalDateTime.now())
                .build();

        Test saveResult = testRepo.save(test);
        if (saveResult == null)
            throw new ApiMessageException("시험 등록에 실패하였습니다.");
    }

    @Transactional
    public void modifyStartEndTime(Long tid, LocalDateTime startTime, LocalDateTime endTime) {
        testRepo.findById(tid).orElseThrow(() -> new ApiMessageException("존재하지 않는 테스트 입니다."));

        if (startTime != null) {
            testRepo.updateStartTime(tid, startTime);
        }
        if (endTime != null) {
            testRepo.updateEndTime(tid, endTime);
        }
    }

    @Transactional
    public void modifyValidateKey(TestValidateKeyReqDTO modifyTestValidateKeyDTO) {
        testRepo.findById(modifyTestValidateKeyDTO.getTid())
                .orElseThrow(() -> new ApiMessageException("존재하지 않는 테스트 입니다."));
        testRepo.updateValidateKey(modifyTestValidateKeyDTO.getTid(), modifyTestValidateKeyDTO.getValidateKey());
    }

    public List<TestResDTO> findTestAll() {
        List<Test> testList = testRepo.findAll();
        List<TestResDTO> resList = new ArrayList<>();

        for (Test t : testList) {
            TestResDTO tmp = TestResDTO.of(t);
            List<String> sabunList = testRepo.findMemberByTest(t.getTid());
            tmp.setJoinPeopleCnt(sabunList.size());
            resList.add(tmp);
        }
        return resList;
    }

    public List<TestResDTO> findTestByTid(Long tid) {
        List<String> sabunList = testRepo.findMemberByTest(tid);

        Optional<Test> result = testRepo.findFirstTestByTid(tid);
        if (result.isEmpty()) {
            throw new ApiMessageException("번호에 매칭되는 시험이 없습니다.");
        }

        Test t = result.get();
        TestResDTO tmp = TestResDTO.of(t);
        tmp.setJoinPeopleCnt(sabunList.size());

        List<TestResDTO> testResList = new ArrayList<>();
        testResList.add(tmp);

        return testResList;
    }

    public List<Test> findTestByMember(String sabun) {
        List<Long> tidList = testRepo.findByMember(sabun);

        List<Test> result = new ArrayList<>();
        for (Long tid : tidList) {
            Test temp = testRepo.findById(tid).orElseThrow(() -> new ApiMessageException("시험을 찾을 수 없습니다."));
            result.add(temp);
        }

        return result;
    }

    public List<Integer> getScoresFromTestResult(Long tid) {
        List<Integer> result = new ArrayList<>();

        List<String> sabunList = testRepo.findMemberByTest(tid);
        for (String sabun : sabunList) {
            int score = 0;
            List<Long> problemList = testRepo.findProblemByMemberAndTest(sabun, tid);
            for (Long pid : problemList) {
                score += testRepo.findPointByProblem(pid);
            }
            result.add(score);
        }

        return result;
    }

    public int getScoreBySabunAndTest(String sabun, Long tid) {
        int score = 0;
        List<Long> problemList = testRepo.findProblemByMemberAndTest(sabun, tid);
        for (Long pid : problemList) {
            score += testRepo.findPointByProblem(pid);
        }
        return score;
    }

    public void submit(SubmitReqDTO submitReqDTO) {
        for (AnswerDTO answerDTO : submitReqDTO.getAnswerDTOList()) {
            memberProblemRepo.save(MemberProblem.builder()
                    .isCollect(answerDTO.isCollect(problemRepo.getAnswer(answerDTO.getPid())))
                    .member(memberRepo.findById(submitReqDTO.getSabun())
                            .orElseThrow(() -> new ApiMessageException("회원을 찾을 수 없습니다.")))
                    .problem(problemRepo.findById(answerDTO.getPid())
                            .orElseThrow(() -> new ApiMessageException("문제를 찾을 수 없습니다.")))
                    .userAnswer(answerDTO.getAnswer())
                    .build());
        }
    }
}
