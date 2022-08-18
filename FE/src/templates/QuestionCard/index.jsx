import React, { useEffect } from 'react';
import { Checkbox } from '@mui/material';



const QuestionCard = (questions, arr) => { 
    useEffect(() => {

    })

    const jusikChange = (event) => {
        questions.arr[event.target.name -1] = event.target.value
        sessionStorage.setItem('dabji',JSON.stringify(questions.arr))
        console.log(JSON.parse(sessionStorage.getItem('dabji')).length)
        console.log(questions.arr)
    }

    const handleChange = (event) => {
        if (event.target.checked) {
            const targetArr =  questions.arr[event.target.name - 1]    
            questions.arr[event.target.name - 1] = [...targetArr,event.target.value]
            questions.arr[event.target.name = 1].sort()
            sessionStorage.setItem('dabji', JSON.stringify(questions.arr))  
        }else{
            const index = questions.arr[event.target.name - 1].indexOf(String(event.target.value))
            console.log(questions.arr[event.target.name - 1].indexOf(String(event.target.value)))
            questions.arr[event.target.name - 1].splice(index, 1)
            questions.arr[event.target.name = 1].sort()
            sessionStorage.setItem('dabji', JSON.stringify(questions.arr))   
        }

        console.log(event.target.checked)
        console.log(questions.arr)
        console.log('추가할번호',event.target.value)
        console.log('추가할배열의 인덱스값',event.target.name)
        // if ( questions.arr[event.target.name - 1]) {
        //questions.arr[event.target.name - 1].push(event.target.value)
        // }else {
        // const targetArr =  questions.arr[event.target.name - 1]    
        // questions.arr[event.target.name - 1] = [...targetArr,event.target.value]



        // questions.arr[event.target.name - 1] = Array(event.target.value)
        // }
        console.log(questions.arr)

    }

    const choiquestion = (temtem,banana) => temtem.map((tem) => {
        
        // apple += 1
        // if (apple === temtem.length - 1){
        //     CheatKey = true
        // }
        let sentense =  tem.ord + '. ' + tem.text

        return <div style={{display: "flex", flexDirection: "row",alignItems : "center"}}>
        <Checkbox
        value={tem.ord} 
        name={banana} 
        onChange={handleChange}

        /> 
        {sentense}
        </div>
    }) 

    let banana = 0

    
    return (
        <div>
            {questions.questions.map((item) => {
                banana += 1

                return <div style={{marginBottom:"20%"}}>
                { (item.items.length === 0) ?
                <>
                
                <p>Q{banana}.{item.title}</p>
                <textarea name={banana} onChange={jusikChange} style={{height:"100px",width:"100%"}}/>
                </>
                :
                <>

                <p>Q{banana}.  {item.title}</p>
                    {/* <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name={banana}
                    onChange={handleChange}
                    > */}

                    {choiquestion(item.items,banana)}
                    {/* </RadioGroup> */}
                </>
                }
                </div>
                
            })}
        </div>
    );
};

export default QuestionCard;