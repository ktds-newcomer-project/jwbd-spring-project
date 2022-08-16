package com.ktds.kxam.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResProblemDTO {
    private Long pid;

    private String title;

    private String contents;

    private String answer;

    private String items;

    private boolean isDelete;

    private String reasonOfDelete;

    private int point;

    private Long tid;
}
