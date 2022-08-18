package com.ktds.kxam.dto.req;

import com.ktds.kxam.entity.Member;
import com.ktds.kxam.entity.MemberRole;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberSaveReqDTO {

    private String sabun;
    private String name;
    private String mpw;

    public static MemberSaveReqDTO of(Member m) {
        return MemberSaveReqDTO.builder()
                .mpw(m.getMpw())
                .sabun(m.getSabun())
                .name(m.getName())
                .build();
    }
}
