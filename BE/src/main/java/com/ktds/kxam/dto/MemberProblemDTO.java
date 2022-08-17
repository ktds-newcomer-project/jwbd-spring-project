package com.ktds.kxam.dto;

import com.ktds.kxam.entity.Member;
import com.ktds.kxam.entity.MemberProblem;
import com.ktds.kxam.entity.Problem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberProblemDTO {
    private Long id;

    private String sabun;

    private Long pid;

    private String userAnswer;

    private boolean isCollect;

    public static MemberProblemDTO of(MemberProblem mp){
        return MemberProblemDTO.builder()
                .id(mp.getId())
                .isCollect(mp.isCollect())
                .pid(mp.getProblem().getPid())
                .sabun(mp.getMember().getSabun())
                .userAnswer(mp.getUserAnswer())
                .build();
    }
}
