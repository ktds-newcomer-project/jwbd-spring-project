package com.ktds.kxam.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginReponseVO {
    @Builder.Default
    String Token = "";
    @Builder.Default
    String Info = "Failed";
    @Builder.Default
    String Name = "";
}
