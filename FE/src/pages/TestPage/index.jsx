import React, {useState,useEffect} from 'react';

import Button from '@mui/material/Button';
import './style.css'
import { useStore } from '../../states'
import moment from 'moment';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import QuestionCard from '../../templates/QuestionCard';

const TestPage = () => {
  const  { userToken } = useStore();
  const navigate = useNavigate();
  const [dateDis, setDateDis] = useState();
  const [sec, setSec] = useState();
  const [min, setMin] = useState();
  const [hour, setHour] = useState();
  useEffect(() => {
    const id = setInterval(() => {
      let date1 = moment();
      let date2 = moment("2022-08-11T18:50:00+09:00");
      date1.format(); // 2021-10-09T00:44:52+09:00
      date2.format(); // 2020-04-08T00:00:00+09:00
      const dateDis = date2.diff(date1)
      let dis_Hour = 0
      let dis_Minute = 0
      let dis_Seconds = 0
      if (dateDis >= 3600) {
        dis_Hour = date2.diff(date1, 'hours')
        dis_Minute = date2.diff(date1, 'minutes') - (dis_Hour * 60)
        dis_Seconds = date2.diff(date1, 'seconds') - (dis_Hour * 3600 ) - (dis_Minute * 60)
        setSec(dis_Seconds)
        setMin(dis_Minute)
        setHour(dis_Hour)
      }
      console.log(dis_Hour,dis_Minute,dis_Seconds)
      console.log(dateDis)
      setDateDis(dateDis => dateDis - 1);
      
      console.log()
    }, 1000);
    if(dateDis <= 0){
      clearInterval(id);
      Swal.fire("시간이 종료되었습니다")
      navigate('/home')
    }
    return () => clearInterval(id);
  }, [dateDis]);

  const testList = [
    { label: 'JAVA WEB 테스트', testCode: 82256975 },
    { label: 'Python WEB 테스트', testCode: 82256954 },
    { label: 'Spider WEB 테스트', testCode: 82256978 },
    { label: 'JPA WEB 테스트', testCode: 82256934 },
    { label: 'SAP WEB 테스트', testCode: 82256946 },
    { label: 'StacrCraft WEB 테스트', testCode: 82246857 },
    { label: '황새오래걷기 WEB 테스트', testCode: 82267857 }
  ]

  const questions = [
                    {type: 1, question:"아이스크림을 좋아하나요?", bogi : []},
                    {type: 0, question:"현직이형을 좋아하나요?", bogi : []},
                    {type: 1, question:"병훈이형을 좋아하나요?", bogi : []},
                    {type: 0, question:"지원이를 좋아하나요?", bogi : []},
                    {type: 1, question:"태형이를 좋아하나요?", bogi : []},
                    {type: 0, question:"정동균을 좋아하나요?", bogi : []}
                    ]
  // let banana = 0
  // const questionBox = questions.map((item) => {
  //   banana += 1
  //   return <div>
  //     {banana}
  //     <p> {item.question}</p>
  //   </div>
    
  // })

    return (
       <div className="test-page-div">
          <h1>KT DS Test</h1>
          <h1 className="timer"> 남은 시간  : {hour} {min} {sec}</h1>  
          <QuestionCard questions={questions} />
          <div className="test-div">
            <Button style={{ marginLeft : "2vw", height:"40px"}} variant="outlined" size="small">제출하기</Button>
          </div>
        
       </div>
  )
};

export default TestPage;