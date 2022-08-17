package com.ktds.kxam.controller;

import com.ktds.kxam.dto.common.CommonResult;
import com.ktds.kxam.dto.common.ListResult;
import com.ktds.kxam.dto.common.SingleResult;
import com.ktds.kxam.dto.req.SubmitReqDTO;
import com.ktds.kxam.dto.req.TestTimeReqDTO;
import com.ktds.kxam.dto.req.TestValidateKeyReqDTO;
import com.ktds.kxam.dto.TestDTO;
import com.ktds.kxam.entity.Test;
import com.ktds.kxam.service.ResponseService;
import com.ktds.kxam.service.TestService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "시험 등록 및 수정")
@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/test")
public class TestController {

    private final TestService testService;
    private final ResponseService responseService;

    @Operation(description = "시험 등록")
    @PostMapping
    public @ResponseBody CommonResult saveTest(@RequestBody TestDTO testDTO) throws Exception{
        testService.saveTest(testDTO);
        return responseService.getSuccessResult();
    }

    @Operation(description = "시험 시작 및 종료 시각 수정")
    @PutMapping
    public @ResponseBody CommonResult modifyTest(@RequestBody TestTimeReqDTO modifyTestDTO) throws Exception{
        testService.modifyStartEndTime(modifyTestDTO.getTid(), modifyTestDTO.getStartTime(), modifyTestDTO.getEndTime());
        return responseService.getSuccessResult();
    }

    @Operation(description = "시험 응시자 비밀번호 수정")
    @PutMapping("/validate-key")
    public @ResponseBody CommonResult modifyValidateKey(@RequestBody TestValidateKeyReqDTO modifyTestValidateKeyDTO) throws Exception{
        testService.modifyValidateKey(modifyTestValidateKeyDTO);
        return responseService.getSuccessResult();
    }

    @Operation(description = "모든 시험 조회")
    @GetMapping
    public @ResponseBody ListResult<Test> findTestAll(){
        List<Test> result = testService.findTestAll();
        return responseService.getListResult(result);
    }

    @Operation(description = "내가 응시한 시험 목록 조회")
    @GetMapping("/find-by/member")
    public @ResponseBody ListResult<Test> findTestByMember(@RequestParam("sabun") String sabun) throws Exception{
        List<Test> result = testService.findTestByMember(sabun);
        return responseService.getListResult(result);
    }

    @Operation(description = "시험에 응시한 사람들의 모든 점수 조회")
    @GetMapping("/scores")
    public @ResponseBody ListResult<Integer> getScores(@RequestParam("tid")Long tid) throws Exception{
        List<Integer> result = testService.getScoresFromTestResult(tid);
        return responseService.getListResult(result);
    }

    @Operation(description = "시험에 응시한 사람의 사번으로 해당 인원의 해당 시험 점수 조회")
    @GetMapping("/score")
    public @ResponseBody SingleResult<Integer> getScore(@RequestParam("sabun")String sabun, @RequestParam("tid")Long tid) throws Exception{
        int result = testService.getScoreBySabunAndTest(sabun, tid);
        return responseService.getSingleResult(result);
    }

    @Operation(description = "시험 제출")
    @PostMapping("/submit")
    public @ResponseBody CommonResult submit(@RequestBody SubmitReqDTO submitReqDTO) throws Exception{
        testService.submit(submitReqDTO);
        return responseService.getSuccessResult();
    }
}
