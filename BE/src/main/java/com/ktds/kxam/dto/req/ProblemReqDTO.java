package com.ktds.kxam.dto.req;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProblemReqDTO {
    private Long pid;

    private String title;

    private String answer;

    private List<String> items;

    private String reasonOfDelete;

    private int point=5;

    private Long tid;
}
