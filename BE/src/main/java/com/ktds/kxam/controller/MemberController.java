package com.ktds.kxam.controller;

import com.ktds.kxam.dto.common.CommonResult;
import com.ktds.kxam.dto.MemberDTO;
import com.ktds.kxam.dto.MemberProblemDTO;
import com.ktds.kxam.dto.common.ListResult;
import com.ktds.kxam.dto.req.LoginReqDTO;
import com.ktds.kxam.dto.res.LoginResDTO;
import com.ktds.kxam.service.MemberProblemService;
import com.ktds.kxam.service.MemberService;
import com.ktds.kxam.service.ResponseService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "회원 관리")
@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/member")
public class MemberController {

    private final MemberService memberService;
    private final ResponseService responseService;

    @PostMapping("/login")
    public @ResponseBody ListResult<LoginResDTO> doLogin(@RequestBody LoginReqDTO dto) {
        return responseService.getListResult(memberService.doLogin(dto));
    }

    @Operation(description = "page를 넣어 나눠서 받음.")
    @GetMapping("/findAll")
    public @ResponseBody ListResult<MemberDTO> findByPage()
            throws Exception {
        return responseService.getListResult(memberService.allListNotPage());
    }

    // TODO: 권한 Filter?
    @Operation(description = "page를 넣어 나눠서 받음.")
    @GetMapping("/find")
    public @ResponseBody ListResult<MemberDTO> findByPage(@RequestParam("page") int page)
            throws Exception {
        return responseService.getListResult(memberService.allList(page));
    }

}
