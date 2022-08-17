package com.ktds.kxam.dto.req;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TestValidateKeyReqDTO {
    private Long tid;
    private String validateKey;
}
