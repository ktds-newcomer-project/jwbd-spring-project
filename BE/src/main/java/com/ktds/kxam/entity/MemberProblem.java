package com.ktds.kxam.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"member", "problem"})
public class MemberProblem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    private Problem problem;

    @Column(columnDefinition = "LONGTEXT")
    private String userAnswer;

    @ColumnDefault("false")
    @Column(nullable = false)
    private boolean isCollect;

}