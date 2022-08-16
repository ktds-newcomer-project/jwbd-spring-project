package com.ktds.kxam.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ModifyTestValidateKeyDTO {
    private Long tid;
    private String validateKey;
}
