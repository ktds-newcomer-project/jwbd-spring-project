package org.zerock.sampleapi01;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SampleApi01Application {



    public static void main(String[] args) {
        SpringApplication.run(SampleApi01Application.class, args);
    }

}
