import React, { useState,useLayoutEffect } from 'react';
import { useStore } from '../../states.js';
import { useNavigate } from 'react-router-dom';
import './style.css'
import KTDS from '../../assets/ktds.png'
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import API from '../../API/API.js';

const SigninPage = () => {
    const { userToken, setUserToken } = useStore();
    useLayoutEffect(() => {
        if (localStorage.getItem('isLogin') || userToken ) {
            Swal.fire({
                icon: 'error',
                title: '잘못된 접근',
                text: '로그인이 완료되었습니다.',
                
            }).then(function(){
                navigate('/home')
            })
            
        }
    },[])
    
    const [ Id, setId ] = useState('');
    const [ Pw, setPw ] = useState('');
    
    const navigate = useNavigate();
    
    const handleIdChange = (event) => {
        setId(event.target.value)
    }
    const handlePwChange = (event) => {
        setPw(event.target.value)
    }   



    const goToLogin = async() => {
        if (!Id) {
            Swal.fire({
                icon: 'error',
                title: '미입력',
                text: '아이디를 입력해주세요!',
              })
        }else if (!Pw) {
            Swal.fire({
                icon: 'error',
                title: '미입력',
                text: '비밀번호를 입력하세요!!!',
              })
        }
        await API.post('/member/login',{
            "id" : Id,
            "pwd" : Pw
        }).then((res) => {
            console.log(res)
            console.log('로그인완료')
            navigate('/home')
            setUserToken('1231321411124313')
            localStorage.setItem("isLogin",true)
            localStorage.setItem("sabun", Id)
        })
        .catch((e) => {
            console.log(e)
        })

        
    }

    const buttonStyle1 = {backgroundColor : "#66E4BE",width:"25%", height:"6.5%",fontSize:"17px", minWidth : '120px',minHeight: "40px"}
    
    return (
        <>
        { (!localStorage.getItem('isLogin')) ?
        <div className='signin-main-div'>
            <div className='signin-left-div'>
                <p>KT ds X(Human-resource) Automation Management</p>
                <h1>K:xam</h1>
            </div>
            <div className='signin-right-div'>
                <img className="login-logo" src={KTDS} alt="ktds" />
                <TextField id="outlined-basic" 
                            style={{marginBottom : "3%"}}
                            placeholder="ID를 입력하세요"
                            className="id-textbox"
                            value={Id}
                            onChange={handleIdChange}
                            variant="outlined" />
                <TextField id="outlined-basic" 
                            style={{marginBottom : "5%"}}
                            placeholder="패스워드를 입력하세요"
                            className="id-textbox"
                            value={Pw}
                            type="password"
                            onChange={handlePwChange}
                            variant="outlined" />
                <Button onClick={goToLogin} style={buttonStyle1}  variant="contained">로그인하기</Button>
            </div>
           
        </div>
        : null }
        </>
    );
};

export default SigninPage;