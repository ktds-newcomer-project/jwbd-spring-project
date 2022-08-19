import React, {useState,useEffect} from 'react';

import Button from '@mui/material/Button';
import './style.css'
import { useStore, useTestInput } from '../../states'
import moment from 'moment';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import QuestionCard from '../../templates/QuestionCard';
import API from '../../API/API';

const TestPage = () => {
  const  { userToken } = useStore();
  const { testId, testPw } = useTestInput();
  const navigate = useNavigate();
  const [dateDis, setDateDis] = useState();
  const [sec, setSec] = useState();
  const [min, setMin] = useState();
  const [hour, setHour] = useState();
  const [arr, setArr] = useState([]);
  const [ testData, setTestData ] = useState();
  const [ isSubmit, setIsSubmit ] = useState(false);
  
  const checkTestId = testId || sessionStorage.getItem('tempTestId')
  const checkTestPw = testPw || sessionStorage.getItem('tempTestPw')

  let binterter2 = []

  
  useEffect(() => {
    let startTime
    let endTime
      
    API.get(`/test/info?tid=${checkTestId}`)
    .then((res) => {
      
      startTime = res.data.data[0].startTime
      endTime = res.data.data[0].endTime

      
      let date1 = moment();
      console.log(startTime)
      console.log(endTime)
      console.log(date1)
      // 현재시간 - 시작시간 = 음수일 때 시간이 부족.
      if (date1.diff(startTime) <= 0) {
        clearInterval(id);
        Swal.fire("아직 시험응시 시간이 아닙니다.")
        navigate('/home')
      }
      // 현재시간 - 종료시간 = 양수일 때 시간이 초과.
      else if (date1.diff(endTime) > 0) {
        clearInterval(id);
        Swal.fire("시험응시 가능 시간이 지났습니다")
        navigate('/home')
      }
    })
    
    const id = setInterval(() => {
      // console.log('여기',arr)
      let date1 = moment();
      let date2 = moment(endTime);
      date1.format(); // 2021-10-09T00:44:52+09:00
      date2.format(); // 2020-04-08T00:00:00+09:00
      const dateDis = date2.diff(date1)
      let dis_Hour = 0
      let dis_Minute = 0
      let dis_Seconds = 0
      if (dateDis >= 0) {
        dis_Hour = date2.diff(date1, 'hours')
        dis_Minute = date2.diff(date1, 'minutes') - (dis_Hour * 60)
        dis_Seconds = date2.diff(date1, 'seconds') - (dis_Hour * 3600 ) - (dis_Minute * 60)
        setSec(dis_Seconds)
        setMin((dis_Minute) ? dis_Minute + ' :': null )
        setHour((dis_Hour) ? dis_Hour + ' :': null )
        // console.log(dateDis)
      }else{
        clearInterval(id);
        Swal.fire("시간이 종료되었습니다")
        navigate('/home')
      }
      setDateDis(dateDis => dateDis - 1);
      
      if (isSubmit) {
        clearInterval(id);
      }
    }, 1000);
    return () => clearInterval(id);
  }, []);
  
  useEffect(() => {
      
      API.get(`/problem/find-by/test?tid=${checkTestId}&validateKey=${checkTestPw}`)
      .then((res) => {
      console.log(res.data.data)
      setTestData(res.data.data)
      setArr(Array(res.data.data.length).fill([]))
      }
      ).catch((e) => {
        if (sessionStorage.getItem("tempTestPw") && sessionStorage.getItem("tempTestId"))
        { 
          let testId  = sessionStorage.getItem('tempTestId')
          API.get(`/problem/find-by/test?tid=${testId}&validateKey=${sessionStorage.getItem("tempTestPw")}`)
          .then((res) => {

            setTestData(res.data.data)
            setArr(Array(res.data.data.length).fill([]))
          }).catch((e) => {
            Swal.fire('올바른 접근이 아닙니다. <br> 다시 확인하고 접속해주세요!')
            navigate('/home')
          })
        }
      })

  },[])

  const submitTest = () => {
    Swal.fire({
      title: '정말 제출 하시겠습니까?',
      showCancelButton: true,
      cancelButtonText: '돌아가기',
      confirmButtonText: '제출하기',
      focusCancel: true,
    }).then((result) => {
      if(result.isConfirmed) {
        const tingtong = sessionStorage.getItem('dabji')
        let tingting = JSON.parse(tingtong);
        console.log(tingtong)
        let cc = 0
        tingting.map((item) => {
          let kk = {}
          let arr = item.toString()
          kk["pid"] = testData[cc].pid
          kk["answer"] = arr
          binterter2.push(kk)
          console.log('넣어',kk)
          console.log('testdata',testData)
          cc += 1
        })
        console.log('빈똘똘이!!',binterter2)
        API.post('/test/submit', {
          sabun : localStorage.getItem('sabun'),
          answerDTOList : binterter2
        }).then((res) => {
          console.log(res)
          Swal.fire({
            icon: 'success',
            title: '정상적으로 제출하셨습니다. <br>수고하셨습니다.',
            showConfirmButton: false,
            timer: 2500
          })
          navigate('/home')
        }).catch((e) => {
          console.log(e)
        })
        setIsSubmit(true)
        
      }
    })
    
  }
  // const testList = [
  //   { label: 'JAVA WEB 테스트', testCode: 82256975 },
  //   { label: 'Python WEB 테스트', testCode: 82256954 },
  //   { label: 'Spider WEB 테스트', testCode: 82256978 },
  //   { label: 'JPA WEB 테스트', testCode: 82256934 },
  //   { label: 'SAP WEB 테스트', testCode: 82256946 },
  //   { label: 'StacrCraft WEB 테스트', testCode: 82246857 },
  //   { label: '황새오래걷기 WEB 테스트', testCode: 82267857 }
  // ]

  // const questions = [
  //                   {type: 1, question:"아이스크림을 좋아하나요?", bogi : []},
  //                   {type: 0, question:"현직이형을 좋아하나요?", bogi : ['매우 좋아한다.','조금 좋아한다.', '보통이다.', '조금 혐오한다.', '혐오한다.']},
  //                   {type: 1, question:"병훈이형을 좋아하나요?", bogi : []},
  //                   {type: 0, question:"지원이를 좋아하나요?", bogi : ['매우 좋아한다.','조금 좋아한다.', '보통이다.', '조금 혐오한다.', '혐오한다.']},
  //                   {type: 1, question:"태형이를 좋아하나요?", bogi : []},
  //                   {type: 1, question:"정동균을 좋아하나요?", bogi : []}
  //                   ]       
    return (
       <div className="test-page-div">
          <h1>KT DS Test</h1>
          
          <h1 className="timer"> 남은 시간　{hour} {min} {sec}</h1>  
          <div style={{width: "40%"}}>
            { (testData) ? 
            <QuestionCard questions={testData} arr={arr} />
            :
            null
            }
            
            </div>
          <div className="test-div">
            <Button style={{ marginLeft : "2vw", height:"40px"}} onClick={submitTest} variant="outlined" size="small">제출하기</Button>
          </div>
        
       </div>
  )
};

export default TestPage;