package com.ktds.kxam.dto.req;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnswerDTO {
    private Long pid;
    private String answer;

    public boolean isCollect(String answer){
        return this.answer.equals(answer);
    }
}
