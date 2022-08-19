package com.ktds.kxam.controller;

import com.ktds.kxam.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;
import com.ktds.kxam.dto.MakeTokenDTO;

import java.util.HashMap;
import java.util.Map;

@RestController
@Log4j2
@RequiredArgsConstructor
public class TokenController {

    private final JWTUtil jwtUtil;


    @PostMapping("/makeTokens")
    public Map<String, String> makeToknes(@RequestBody MakeTokenDTO makeTokenDTO){

        Map<String, Object> map = new HashMap<>();
        map.put("mid", makeTokenDTO.getMid());

        log.info(makeTokenDTO.getMid());

        String accessToken = jwtUtil.generateToken(map, 1);
        String refreshToken = jwtUtil.generateToken(map, 30);

        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        log.info("--------------------------------------------");
        log.info("accessToken: " + accessToken);
        log.info("refreshToken: " +refreshToken);

        return Map.of("accessToken", accessToken, "refreshToken", refreshToken);

    }

    @PostMapping("/refreshTokens")
    public Map<String, String> refreshToknes(@RequestHeader("Authorization") String accessToken, String refreshToken){

        log.info("--------------------------------------------");
        log.info("accessToken:"+accessToken);
        log.info("refreshToken:" + refreshToken);

        Map<String, Object> claims = jwtUtil.validateToken(refreshToken);


        String newAccessToken = jwtUtil.generateToken(claims, 1);
        String newRefreshToken = jwtUtil.generateToken(claims,30);



        return Map.of("accessToken", newAccessToken, "refreshToken", newRefreshToken);
    }


}















