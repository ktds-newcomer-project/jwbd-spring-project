package com.ktds.kxam.dto.res;

import java.util.Set;

import com.ktds.kxam.entity.MemberRole;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResDTO {
    @Builder.Default
    String sabun = "";
    @Builder.Default
    Set<MemberRole> type;
    @Builder.Default
    String name = "";
    @Builder.Default
    String token = "임시토큰";

}
