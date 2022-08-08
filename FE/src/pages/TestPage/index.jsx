import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import './style.css'


const TestPage = () => {
  const testList = [
    { label: 'JAVA WEB 테스트', testCode: 82256975 },
    { label: 'Python WEB 테스트', testCode: 82256954 },
    { label: 'Spider WEB 테스트', testCode: 82256978 },
    { label: 'JPA WEB 테스트', testCode: 82256934 },
    { label: 'SAP WEB 테스트', testCode: 82256946 },
    { label: 'StacrCraft WEB 테스트', testCode: 82246857 },
    { label: '황새오래걷기 WEB 테스트', testCode: 82267857 }
  ]



    return (
       <div className="test-page-div">
          <h1>KT DS Test</h1>
          <div className="test-div">
            <Autocomplete
            id="combo-box-demo"
            options={testList}
            sx={{ width: 300 }}

            renderInput={(params) => <TextField {...params} label="테스트 항목" />}
            />
            <Button style={{ marginLeft : "2vw", height:"40px"}} variant="outlined" size="small">테스트 보러가기</Button>
          </div>
       </div>
  )
};

export default TestPage;