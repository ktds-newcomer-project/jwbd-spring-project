package com.ktds.kxam.entity;


import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tno;

    private String title;

    private String writer;

    private LocalDate dueDate;

    private boolean complete;

    public void change(String title, LocalDate dueDate, boolean complete){
        this.title = title;
        this.dueDate = dueDate;
        this.complete = complete;
    }
}
