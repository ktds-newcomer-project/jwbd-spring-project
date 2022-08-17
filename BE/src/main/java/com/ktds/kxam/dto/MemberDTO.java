package com.ktds.kxam.dto;

import com.ktds.kxam.entity.Member;
import com.ktds.kxam.entity.MemberRole;

import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
@Builder
public class MemberDTO {

    private String sabun;

    private String name;

    private Set<MemberRole> roleSet;

    public static MemberDTO of(Member m) {
        return MemberDTO.builder()
                .sabun(m.getSabun())
                .name(m.getName())
                .roleSet(m.getRoleSet())
                .build();
    }
}
