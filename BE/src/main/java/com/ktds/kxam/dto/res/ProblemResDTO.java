package com.ktds.kxam.dto.res;

import com.ktds.kxam.entity.Problem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProblemResDTO {
    private Long pid;

    private String title;

    private String contents;

    private String answer;

    private String items;

    private boolean isDelete;

    private String reasonOfDelete;

    private int point;

    private Long tid;

    public static ProblemResDTO of(Problem problem){
        return ProblemResDTO.builder()
                .pid(problem.getPid())
                .title(problem.getTitle())
                .contents(problem.getContents())
                .items(problem.getItems())
                .answer(problem.getAnswer())
                .isDelete(problem.isDelete())
                .point(problem.getPoint())
                .reasonOfDelete(problem.getReasonOfDelete())
                .tid(problem.getTest().getTid())
                .build();
    }
}
