import React from 'react';
import { useStore } from '../../states.js';
import { useNavigate } from 'react-router-dom';



const SigninPage = () => {

    const { setUserToken } = useStore()
    const navigate = useNavigate()

    const goToLogin = () => {
        setUserToken('1231321411124313')
        localStorage.setItem("isLogin",true)
        navigate('/home')
        console.log('로그인완료')
        window.location.replace("/home")
        
    }

    return (
        <div>
            로그인페이지
            <button onClick={goToLogin}>로그인하기</button>
        </div>
    );
};

export default SigninPage;