package com.ktds.kxam.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"tag", "problem"})
public class ProblemTagHash {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pthId;

    @ManyToOne(fetch = FetchType.LAZY)
    private Problem problem;

    @ManyToOne(fetch = FetchType.LAZY)
    private Tag tag;
}