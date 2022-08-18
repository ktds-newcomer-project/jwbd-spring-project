package com.ktds.kxam.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    private String answer;

    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    @OrderBy("ord")
    private Set<ProblemOption> items = new HashSet<>();

    @ColumnDefault("false")
    @Column(nullable = false)
    private boolean isDelete;

    private String reasonOfDelete;

    @ColumnDefault("5")
    @Column(nullable = false)
    private int point;

    @ManyToOne(fetch = FetchType.LAZY)
    private Test test;

    public void addOption(ProblemOption problemOption){
        problemOption.setOrd(items.size()+1);
        items.add(problemOption);
    }

    public void clearOption(){
        items.clear();
    }

}