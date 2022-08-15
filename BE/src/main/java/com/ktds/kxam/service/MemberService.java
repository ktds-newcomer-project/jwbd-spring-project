package com.ktds.kxam.service;

import com.ktds.kxam.model.LoginReponseVO;
import com.ktds.kxam.model.LoginRquestVO;

public interface MemberService {
    LoginReponseVO doLogin(LoginRquestVO vo);
}
