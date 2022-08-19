import React, { useState } from 'react';
import { useStore,useTestInput } from '../../states.js';
import Slider from "react-slick";
import Slide1 from '../../assets/carousel4.jpg';
import Slide2 from '../../assets/carousel5.png';
import Slide3 from '../../assets/carousel6.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './style.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Carder from '../../templates/TestCard'
import Java from '../../assets/java.png';
import Sap from '../../assets/sap.png';
import Python from '../../assets/python.png';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect } from 'react';
import API from '../../API/API.js';

const HomePage = () => {
    const { userToken } = useStore();
    const { setTestId, setTestPw } = useTestInput()
    const [inputValue, setInputValue] = useState('');
    const [ boxNum, setBoxNum ] = useState(2);
    const [ alTestBox, setAlTestBox ] = useState([]);
    const [ showMore, setShowMore ] = useState(false);
    const [ allTest, setAllTest] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
      console.log(userToken)

      //요청부
      const popo = async() => 
      await API.get('/test')
      .then((res) => {
        // console.log(res.data.data)
        setAllTest(res.data.data)
      }).catch((e) => {
        console.log(e)
      })
      popo()

      console.log(allTest)

      const testList = [
        { subject: Java, label: 'JAVA WEB 테스트', dueDate: "2022-08-18", testCode: 82256975 },
        { subject: Python,label: 'Python WEB 테스트', dueDate: "2022-08-20", testCode: 82256954 },
        { subject: Python,label: 'Spider WEB 테스트', dueDate: "2022-08-27", testCode: 82256978 },
        { subject: Sap, label: 'SAP WEB 테스트', dueDate: "2022-08-07", testCode: 82256946 },
        { subject: Java, label: 'JPA WEB 테스트', dueDate: "2022-08-24", testCode: 82256934 },
        { subject: Java, label: 'StacrCraft WEB 테스트', dueDate: "2022-08-12", testCode: 82246857 },
        { subject: Sap, label: '황새오래걷기 WEB 테스트', dueDate: "2022-08-15", testCode: 82267857 }
      ]

      setAlTestBox(testList.slice(0,3))
      if (testList.length > 3) {
        setShowMore(true)
      }

    },[])

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 1500,
        arrows: false,
        autoplaySpeed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
      };
    
    const dpAlTestBox = () => {
      setAlTestBox(testList.slice(0,(3*boxNum)))
      if (testList.length <= 3*boxNum) {
        setShowMore(false)
        console.log(testList)
      }else{
        setBoxNum(boxNum+1)
      }
    }


    const buttonStyle1 = {color: 'white', backgroundColor : "#66E4BE",width:"25%", height:"6.5%",fontSize:"17px", minWidth : '150px',minHeight: "40px"}
    const slideStyle = {width: '100%'}
    const testList = [
      { subject: Java, label: 'JAVA WEB 테스트', dueDate: "2022-08-18", testCode: 82256975 },
      { subject: Python,label: 'Python WEB 테스트', dueDate: "2022-08-20", testCode: 82256954 },
      { subject: Python,label: 'Spider WEB 테스트', dueDate: "2022-08-27", testCode: 82256978 },
      { subject: Sap, label: 'SAP WEB 테스트', dueDate: "2022-08-07", testCode: 82256946 },
      { subject: Java, label: 'JPA WEB 테스트', dueDate: "2022-08-24", testCode: 82256934 },
      { subject: Java, label: 'StacrCraft WEB 테스트', dueDate: "2022-08-12", testCode: 82246857 },
      { subject: Sap, label: '황새오래걷기 WEB 테스트', dueDate: "2022-08-15", testCode: 82267857 }
    ]
  
    const confirmTestPw = () => {
      if (inputValue) {
        console.log(inputValue)
        const varidateConfirm = allTest.filter(atm => atm.title === inputValue)
        setTestPw(varidateConfirm[0].validateKey)
        setTestId(varidateConfirm[0].tid)
        Swal.fire({
            title: '응시 비밀번호 확인',
            html: `<input type="password" id="password" class="swal2-input" placeholder="응시 비밀번호">`,
            confirmButtonText: '시험 시작',
            allowEnterKey: true,
            preConfirm: () => {
              const password = Swal.getPopup().querySelector('#password').value
              if (!password) {
                Swal.showValidationMessage(`Please enter login and password`)
              }
              if (password === varidateConfirm[0].validateKey) {
                sessionStorage.setItem('tempTestPw',varidateConfirm[0].validateKey)
                sessionStorage.setItem('tempTestId',varidateConfirm[0].tid)

                navigate('/test')
              }else {
                Swal.fire('비밀번호가 올바르지않습니다.')
              }
              return { password: password }
            }
          })
        }else{
          Swal.fire('시험을 선택해주세요')
        }
    }
    
    // ${result.value.password}
    return (
        <div>
            <div className="home-main-process-div">
                <div className="home-slide-div">
                    <Slider style={slideStyle} {...settings}>
                        <img className="slide-image" src={Slide3} alt="slide1" />
                        <img className="slide-image" src={Slide1} alt="slide2" />
                        <img className="slide-image" src={Slide2} alt="slide3" />
                    </Slider>
                </div>
                <div className="home-test-div">
                    <h1>현재 응시 가능한 시험</h1>
                    <Autocomplete
                      id="combo-box-demo"
                      options={allTest.map((option) => option.title)}
                      inputValue={inputValue}
                      onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                      }}
                      sx={{ width: 300 }}
                      style={{ marginBottom: "5%"}}
                      renderInput={(params) => <TextField {...params} label="테스트 항목" />}
                      />
                    <Button onClick={confirmTestPw} style={buttonStyle1} >응시하러가기</Button>
                </div>
            </div>
            <div className="home-previous-test-div">
                <h2>응시 완료한 시험</h2>
                <div className="pre-test-div">
                {alTestBox.map((item, index) => (
                    
                    <Carder cardImage={item.subject} title={item.label} dueDate={item.dueDate} key={index} />
                  ))}

                </div>
                { (showMore) ? 
                <button className="more-button" onClick={dpAlTestBox}>더보기</button>
                  :
                  null
                }
                
                    {/* <Carder cardImage={Java} title="java 기본시험 1차" dueDate="2022-08-17" />
                    <Carder cardImage={Python} title="파이썬 응용시험 1차" dueDate="2022-08-19" />
                    <Carder cardImage={Sap} title="SAP 모의시험 1차" dueDate="2022-08-23" /> */}
                
            </div>
        </div>
        

    );
};

export default HomePage;