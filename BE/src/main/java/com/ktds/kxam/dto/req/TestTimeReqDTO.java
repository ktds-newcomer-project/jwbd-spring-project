package com.ktds.kxam.dto.req;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TestTimeReqDTO {
    private Long tid;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
