package com.ktds.kxam.dto;

import com.ktds.kxam.entity.Test;
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
@NoArgsConstructor
@AllArgsConstructor
public class ProblemDTO {
    private Long pid;

    private String title;

    private String contents;

    private String answer;

    private String items;

    private String reasonOfDelete;

    private int point;

    private Long tid;
}
