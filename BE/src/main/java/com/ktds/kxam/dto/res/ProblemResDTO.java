package com.ktds.kxam.dto.res;

import com.ktds.kxam.entity.Problem;
import com.ktds.kxam.entity.ProblemOption;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProblemResDTO {
    private Long pid;

    private String title;

    private String contents;

    private String answer;

    private Set<ProblemOption> items;

    private boolean isDelete;

    private String reasonOfDelete;

    private int point;

    private Long tid;

    public static ProblemResDTO of(Problem problem){
        return ProblemResDTO.builder()
                .pid(problem.getPid())
                .title(problem.getTitle())
                .items(problem.getItems())
                .answer(problem.getAnswer())
                .isDelete(problem.isDelete())
                .point(problem.getPoint())
                .reasonOfDelete(problem.getReasonOfDelete())
                .tid(problem.getTest().getTid())
                .build();
    }
}
