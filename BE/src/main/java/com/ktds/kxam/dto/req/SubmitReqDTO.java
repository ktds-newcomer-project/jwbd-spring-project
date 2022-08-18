package com.ktds.kxam.dto.req;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SubmitReqDTO {
    private String sabun;
    private List<AnswerDTO> answerDTOList;
}
