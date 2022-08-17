package com.ktds.kxam.controller;

import com.ktds.kxam.dto.*;
import com.ktds.kxam.dto.common.CommonResult;
import com.ktds.kxam.dto.common.ListResult;
import com.ktds.kxam.dto.res.ProblemResDTO;
import com.ktds.kxam.entity.Problem;
import com.ktds.kxam.service.ProblemService;
import com.ktds.kxam.service.ProblemTagHashService;
import com.ktds.kxam.service.ResponseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "문제 등록, 수정, 조회")
@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/problem")
public class ProblemController {

    private final ProblemService problemService;
    private final ProblemTagHashService problemTagHashService;
    private final ResponseService responseService;

    @Operation(description = "문제 등록")
    @PostMapping
    public @ResponseBody CommonResult saveProblem(@RequestBody ProblemDTO problemDTO) throws Exception{
        problemService.saveProblem(problemDTO);
        return responseService.getSuccessResult();
    }

    @Operation(description = "문제 삭제")
    @DeleteMapping
    public @ResponseBody CommonResult deleteProblem(@RequestBody ProblemModifyDTO problemDeleteDTO) throws Exception{
        problemService.updateIsDelete(problemDeleteDTO.getPid(), problemDeleteDTO.getText());
        return responseService.getSuccessResult();
    }

    @Operation(description = "정답 수정")
    @PutMapping("/update/answer")
    public @ResponseBody CommonResult updateAnswer(@RequestBody ProblemModifyDTO problemModifyDTO) throws Exception{
        problemService.updateAnswer(problemModifyDTO.getPid(), problemModifyDTO.getText());
        return responseService.getSuccessResult();
    }

    @Operation(description = "보기 수정")
    @PutMapping("/update/items")
    public @ResponseBody CommonResult updateItmes(@RequestBody ProblemModifyDTO problemModifyDTO) throws Exception{
        problemService.updateItems(problemModifyDTO.getPid(), problemModifyDTO.getText());
        return responseService.getSuccessResult();
    }

    @Operation(description = "시험 id로 문제 조회")
    @GetMapping(value = "/find-by/test", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ListResult<ProblemResDTO> findProblemByTestId(@RequestParam("tid")Long tid, @RequestParam("validateKey")String validateKey) throws Exception{
        List<ProblemResDTO> result = problemService.findProblemsByTestId(tid, validateKey);
        return responseService.getListResult(result);
    }

    @Operation(description = "태그 id로 문제 조회")
    @GetMapping(value = "/find-by/tag", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ListResult<ProblemResDTO> findProblemByTag(@RequestParam("tagId") Long tagId) throws Exception{
        List<ProblemResDTO> result = problemService.findProblemsByTag(tagId);
        return responseService.getListResult(result);
    }

    @Operation(description = "문제에 태그 등록")
    @PostMapping("/problem-tag")
    public @ResponseBody CommonResult registTagToProblem(@RequestBody ReqProblemTagHashDTO problemTagHashDTO) throws Exception{
        problemTagHashService.saveProblemTagHash(problemTagHashDTO);
        return responseService.getSuccessResult();
    }

    @Operation(description = "문제에 태그 삭제")
    @DeleteMapping("/problem-tag")
    public @ResponseBody CommonResult deleteTagFromProblem(@RequestParam("pthId") Long pthId) throws Exception{
        problemTagHashService.deleteProblemTagHash(pthId);
        return responseService.getSuccessResult();
    }
}
