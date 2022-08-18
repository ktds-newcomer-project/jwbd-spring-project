package com.ktds.kxam.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import com.ktds.kxam.entity.Test;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TestResDTO {

    private Long tid;

    private String title;

    private String author;

    private int cutLine;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private LocalDateTime createdAt;

    private String validateKey;

    private int joinPeopleCnt;

    public static TestResDTO of(Test t) {
        return TestResDTO.builder()
                .tid(t.getTid())
                .title(t.getTitle())
                .author(t.getAuthor())
                .cutLine(t.getCutLine())
                .startTime(t.getStartTime())
                .endTime(t.getEndTime())
                .validateKey(t.getValidateKey())
                .createdAt(t.getCreatedAt())
                .joinPeopleCnt(0)
                .build();
    }
}
