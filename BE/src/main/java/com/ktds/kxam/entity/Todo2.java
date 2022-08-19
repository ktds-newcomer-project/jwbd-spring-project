package com.ktds.kxam.entity;

import lombok.*;
import org.hibernate.annotations.BatchSize;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Todo2 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tno;

    private String title;

    @ElementCollection(fetch = FetchType.LAZY)
    @Builder.Default
    @BatchSize(size = 50)
    private List<String> options = new ArrayList<>();

    public void addOption(String option){
        options.add(option);
    }

    public void clearOptions() {
        options.clear();
    }
}
