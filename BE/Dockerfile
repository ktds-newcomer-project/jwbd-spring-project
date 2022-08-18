#백엔드
FROM openjdk:11-jdk

WORKDIR /server

#-0.0.1 앞에 spring 은 프로젝트마다 다를 것입니다.  
#저는 /backend/spring 폴더 밑에 있어서 배포파일명이 spring-0.0.1-SNAPSHOT.jar 입니다.
COPY ./build/libs/kxam-0.0.1-SNAPSHOT.jar kxam.jar 

ENTRYPOINT ["java", "-jar", "spring.jar"]