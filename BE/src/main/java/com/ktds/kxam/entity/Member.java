package com.ktds.kxam.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Member {
    @Id
    private Long subun;

    @Column(nullable = false, length = 8)
    private String mpw;

    @Column(nullable = false, length = 5)
    private String name;

    @Column(nullable = false)
    @ColumnDefault("0")
    private int type; // 0 : 관리자, 9 : 이용자
}