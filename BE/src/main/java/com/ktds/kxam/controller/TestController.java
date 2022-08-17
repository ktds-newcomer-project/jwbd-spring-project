package com.ktds.kxam.controller;

import com.ktds.kxam.dto.common.CommonResult;
import com.ktds.kxam.dto.common.ListResult;
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
}
