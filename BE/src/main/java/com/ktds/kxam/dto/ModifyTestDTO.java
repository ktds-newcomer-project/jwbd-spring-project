package com.ktds.kxam.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ModifyTestDTO {
    private Long tid;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
