import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AntGraph from '../../templates/AntGraph';
import Java from '../../assets/java.png';
import Sap from '../../assets/sap.png';
import Python from '../../assets/python.png';
import Carder from '../../templates/TestCard'
import './style.css'

const TestResultPage = () => {
    const [ boxNum, setBoxNum ] = useState(2);
    const [ alTestBox, setAlTestBox ] = useState([]);
    const [ showMore, setShowMore ] = useState(false);



    const location = useLocation();
    const { title } = location.state
    useEffect(() => {
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

    const testList = [
        { subject: Java, label: 'JAVA WEB 테스트', dueDate: "2022-08-18", testCode: 82256975 },
        { subject: Python,label: 'Python WEB 테스트', dueDate: "2022-08-20", testCode: 82256954 },
        { subject: Python,label: 'Spider WEB 테스트', dueDate: "2022-08-27", testCode: 82256978 },
        { subject: Sap, label: 'SAP WEB 테스트', dueDate: "2022-08-07", testCode: 82256946 },
        { subject: Java, label: 'JPA WEB 테스트', dueDate: "2022-08-24", testCode: 82256934 },
        { subject: Java, label: 'StacrCraft WEB 테스트', dueDate: "2022-08-12", testCode: 82246857 },
        { subject: Sap, label: '황새오래걷기 WEB 테스트', dueDate: "2022-08-15", testCode: 82267857 }
      ]
    const dpAlTestBox = () => {
    setAlTestBox(testList.slice(0,(3*boxNum)))
    if (testList.length <= 3*boxNum) {
        setShowMore(false)
        console.log(testList)
    }else{
        setBoxNum(boxNum+1)
    }
    }
    
    return (
        <>
        <h1 style={{marginLeft : "15%"}}>내가 본 시험</h1>
        <div className="graph-box-div">
            <div style={{width: "100%"}}>
                <AntGraph />
            </div>
            <div className="graph-box-content-div">
                <h1>{title}</h1>
                <div>
                    <p>최고점 : 92　　최저점 : 11　　평균 : 23</p>
                    <h2>내점수 : 83점</h2>
                </div>

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
        
        </>
    );
};


export default TestResultPage;