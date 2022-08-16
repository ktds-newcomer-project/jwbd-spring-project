package com.ktds.kxam.service;

import com.ktds.kxam.dto.ModifyTestValidateKeyDTO;
import com.ktds.kxam.dto.TestDTO;
import com.ktds.kxam.entity.Test;
import com.ktds.kxam.exception.ApiMessageException;
import com.ktds.kxam.repo.TestRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Log4j2
@Transactional
public class TestService {

    private final TestRepo testRepo;

    @Transactional
    public void saveTest(TestDTO testDTO){
        Test test = Test.builder()
                .author(testDTO.getAuthor())
                .cutLine(testDTO.getCutLine())
                .title(testDTO.getTitle())
                .startTime(testDTO.getStartTime())
                .endTime(testDTO.getEndTime())
                .validateKey((testDTO.getValidateKey()))
                .build();

        Test saveResult = testRepo.save(test);
        if(saveResult == null) throw new ApiMessageException("시험 등록에 실패하였습니다.");
    }

    @Transactional
    public void modifyStartEndTime(Long tid, LocalDateTime startTime, LocalDateTime endTime){
        testRepo.findById(tid).orElseThrow(()->new ApiMessageException("존재하지 않는 테스트 입니다."));

        if(startTime != null){
            testRepo.updateStartTime(tid, startTime);
        }
        if(endTime != null){
            testRepo.updateEndTime(tid, endTime);
        }
    }

    @Transactional
    public void modifyValidateKey(ModifyTestValidateKeyDTO modifyTestValidateKeyDTO){
        testRepo.findById(modifyTestValidateKeyDTO.getTid()).orElseThrow(()->new ApiMessageException("존재하지 않는 테스트 입니다."));
        testRepo.updateValidateKey(modifyTestValidateKeyDTO.getTid(), modifyTestValidateKeyDTO.getValidateKey());
    }
}
