package com.ktds.kxam.service;

import com.ktds.kxam.dto.ReqProblemTagHashDTO;
import com.ktds.kxam.entity.Problem;
import com.ktds.kxam.entity.ProblemTagHash;
import com.ktds.kxam.entity.Tag;
import com.ktds.kxam.exception.ApiMessageException;
import com.ktds.kxam.repo.ProblemRepo;
import com.ktds.kxam.repo.ProblemTagHashRepo;
import com.ktds.kxam.repo.TagRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Log4j2
@Transactional
public class ProblemTagHashService {

    private final ProblemTagHashRepo problemTagHashRepo;
    private final ProblemRepo problemRepo;
    private final TagRepo tagRepo;

    @Transactional
    public void saveProblemTagHash(ReqProblemTagHashDTO reqProblemTagHashDTO){
        Problem problem = problemRepo.findById(reqProblemTagHashDTO.getPid()).orElseThrow(()->new ApiMessageException("문제를 찾을 수 없습니다."));
        Tag tag = tagRepo.findById(reqProblemTagHashDTO.getTagId()).orElseThrow(()->new ApiMessageException("태그를 찾을 수 없습니다."));
        int count = problemTagHashRepo.countProblemTagHashByProblemAndTag(problem.getPid(), tag.getTagId());
        if(count != 0) throw new ApiMessageException("이미 태그가 설정되어 있습니다.");
        ProblemTagHash problemTagHash = ProblemTagHash.builder().problem(problem).tag(tag).build();
        ProblemTagHash result = problemTagHashRepo.save(problemTagHash);
        if(result == null) throw new ApiMessageException("태그 설정에 실패하였습니다.");
    }

    @Transactional
    public void deleteProblemTagHash(Long pthId){
        problemRepo.deleteById(pthId);
    }
}
