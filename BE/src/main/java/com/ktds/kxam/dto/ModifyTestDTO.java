package com.ktds.kxam.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ModifyTestDTO {
    private Long tid;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
