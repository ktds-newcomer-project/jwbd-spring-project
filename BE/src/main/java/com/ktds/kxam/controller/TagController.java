package com.ktds.kxam.controller;

import com.ktds.kxam.dto.common.CommonResult;
import com.ktds.kxam.dto.req.TagReqDTO;
import com.ktds.kxam.service.ResponseService;
import com.ktds.kxam.service.TagService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "태그 등록, 수정, 조회")
@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/tag")
public class TagController {

    private final TagService tagService;
    private final ResponseService responseService;

    @Operation(description = "태그 등록")
    @PostMapping
    public @ResponseBody CommonResult saveTag(@RequestBody String tagName) throws Exception{
        tagService.saveTag(tagName);
        return responseService.getSuccessResult();
    }

    @Operation(description = "태그 이름으로 조회")
    @GetMapping("/find-by/name")
    public @ResponseBody CommonResult findByTagName(@RequestParam("tagName") String tagName) throws Exception{
        List<com.ktds.kxam.entity.Tag> result = tagService.findTagsByTagNameContaining(tagName);
        return responseService.getListResult(result);
    }

    @Operation(description = "문제 id로 태그 조회")
    @GetMapping("/find-by/problem")
    public @ResponseBody CommonResult findByProblem(@RequestParam("pid") Long pid) throws Exception{
        List<com.ktds.kxam.entity.Tag> result = tagService.findTagsByProblem(pid);
        return responseService.getListResult(result);
    }

    @Operation(description = "태그 이름 수정")
    @PutMapping
    public @ResponseBody CommonResult modifyTag(@RequestBody TagReqDTO modifyTagDTO) throws Exception{
        tagService.modifyTagName(modifyTagDTO.getTagId(), modifyTagDTO.getTagName());
        return responseService.getSuccessResult();
    }
}
