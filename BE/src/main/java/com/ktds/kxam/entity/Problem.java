package com.ktds.kxam.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "test")
public class Problem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pid;

    @Column(nullable = false, columnDefinition = "LONGTEXT")
    private String title;

    @Column(nullable = false, columnDefinition = "LONGTEXT")
    private String contents;

    @Column(nullable = false, columnDefinition = "LONGTEXT")
    private String answer;

    @Column(nullable = false, columnDefinition = "LONGTEXT")
    private String items;

    @ColumnDefault("false")
    @Column(nullable = false)
    private boolean isDelete;

    private String reasonOfDelete;

    @ManyToOne(fetch = FetchType.LAZY)
    private Test test;

}