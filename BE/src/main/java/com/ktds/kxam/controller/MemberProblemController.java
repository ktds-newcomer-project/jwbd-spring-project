package com.ktds.kxam.controller;

import com.ktds.kxam.dto.CommonResult;
import com.ktds.kxam.dto.MemberProblemDTO;
import com.ktds.kxam.dto.ReqMemberProblemDTO;
import com.ktds.kxam.entity.MemberProblem;
import com.ktds.kxam.service.MemberProblemService;
import com.ktds.kxam.service.ResponseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "회원이 푼 문제")
@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/member-problem")
public class MemberProblemController {

    private final MemberProblemService memberProblemService;
    private final ResponseService responseService;

    @Operation(description = "회원이 푼 문제 등록")
    @PostMapping
    public @ResponseBody CommonResult saveMemberProblem(@RequestBody MemberProblemDTO memberProblemDTO) throws Exception{
        memberProblemService.saveMemberProblem(memberProblemDTO);
        return responseService.getSuccessResult();
    }

    @Operation(description = "회원이 해당 시험에서 푼 문제목록")
    @GetMapping("/find-by/member-test")
    public @ResponseBody CommonResult findMemberProblemBySabunAndTest(@RequestParam ReqMemberProblemDTO reqMemberProblemDTO) throws Exception{
        List<MemberProblem> result = memberProblemService.findMemberProblemBySabunAndTest(reqMemberProblemDTO.getSabun(), reqMemberProblemDTO.getTid());
        return responseService.getListResult(result);
    }

    @Operation(description = "회원이 푼 모든 문제 조회")
    @GetMapping("/find-by/member")
    public @ResponseBody CommonResult findMemberProblemBySabun(@RequestParam("sabun")String sabun) throws Exception{
        List<MemberProblem> result = memberProblemService.findMemberProblemBySabun(sabun);
        return responseService.getListResult(result);
    }

    @Operation(description = "해당 문제를 푼 모든 회원 조회")
    @GetMapping("/find-by/problem")
    public @ResponseBody CommonResult findMemberProblemByProblem(@RequestParam("pid") Long pid){
        List<MemberProblem> result = memberProblemService.findMemberProblemByProblem(pid);
        return responseService.getListResult(result);
    }
}
