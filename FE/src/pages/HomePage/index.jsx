import React from 'react';
import { useStore } from '../../states.js';
import Slider from "react-slick";
import Slide1 from '../../assets/carousel4.jpg';
import Slide2 from '../../assets/carousel5.png';
import Slide3 from '../../assets/carousel6.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './style.css'
import Button from '@mui/material/Button';
import Select from 'react-select'
import Carder from '../../templates/TestCard'
import Java from '../../assets/java.png';
import Sap from '../../assets/sap.png';
import Python from '../../assets/python.png';


const HomePage = () => {
    const { userToken } = useStore();
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
    
    const buttonStyle1 = {color: 'white', backgroundColor : "#66E4BE",width:"25%", height:"6.5%",fontSize:"17px", minWidth : '150px',minHeight: "40px"}
    const slideStyle = {width: '100%'}
    const selectOptions = [
        { value: 'SAP1', label: 'SAP 종합시험 1차' },
        { value: 'ERP1', label: 'ERP 업무시험 1차' },
        { value: 'JAVA1', label: 'JAVA 기본시험 2차' }
      ]

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
                    <Select 
                    className="select-button"
                    isClearable
                    isSearchable
                    options={selectOptions} />
                    <Button style={buttonStyle1} >응시하러가기</Button>
                </div>
            </div>
            <div className="home-previous-test-div">
                <h2>응시 완료한 시험</h2>
                <div className="pre-test-div">
                    <Carder cardImage={Java} title="java 기본시험 1차" dueDate="2022-08-17" />
                    <Carder cardImage={Python} title="파이썬 응용시험 1차" dueDate="2022-08-19" />
                    <Carder cardImage={Sap} title="SAP 모의시험 1차" dueDate="2022-08-23" />
                </div>
            </div>
        </div>
        

    );
};

export default HomePage;