import React, { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


const QuestionCard = (questions,arr) => {  
    useEffect(() => {
        console.log(questions.arr)
    })
    let CheatKey = false
    const handleChange = (event) => {
        
        console.log(event.target.value)
        questions.arr[event.target.name - 1] = event.target.value
        console.log(event.target)
        console.log(questions.arr)
    }
    const choiquestion = (temtem,banana) => temtem.map((tem) => {
        
        apple += 1
        if (apple === temtem.length-1){
            CheatKey = true
        }
        let sentense =  apple + '. ' + tem
        return <div>
        <FormControlLabel value={apple} banana={banana} control={<Radio />} label={sentense} />
        </div>
    }) 

    let banana = 0
    let apple = 0
    
    return (
        <div>
            {questions.questions.map((item) => {
                banana += 1
                if (CheatKey) {
                    apple = 0
                    CheatKey = false
                }
                return <div style={{marginBottom:"20%"}}>
                { (item.type === 1) ?
                <>
                <p>Q{banana}.{item.question}</p>
                <textarea style={{height:"100px",width:"100%"}}/>
                </>
                :
                <>
                
                <p>Q{banana}.  {item.question}</p>
                <FormControl>
                    <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name={banana}
                    onChange={handleChange}
                    >

                        {choiquestion(item.bogi,banana)}
                    </RadioGroup>
                </FormControl>
                </>
                }
                </div>
                
            })}
        </div>
    );
};

export default QuestionCard;