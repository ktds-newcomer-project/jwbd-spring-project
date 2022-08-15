package com.ktds.kxam.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ktds.kxam.model.LoginReponseVO;
import com.ktds.kxam.model.LoginRquestVO;
import com.ktds.kxam.service.MemberService;

@RestController
@RequestMapping("/member/")
public class MemberController {
    @Autowired
    MemberService ms;

    @GetMapping("")
    // @CrossOrigin("http://localhost:3000")
    public Map<String, String> doHello() {
        Map<String, String> m = new HashMap<>();
        m.put("key", "hello");
        return m;
    }

    @PostMapping("/login")
    public LoginReponseVO doLogin(@RequestBody LoginRquestVO loginVo) {
        System.out.println("POST 호출됨." + loginVo);
        return ms.doLogin(loginVo);
    }

}
