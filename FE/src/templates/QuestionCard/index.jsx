import React from 'react';
const QuestionCard = (questions) => {
    console.log(questions)
    let banana = 0
    return (
        <div>
            {questions.questions.map((item) => {
                banana += 1
                return <div>

                <p>{banana} {item.question}</p>
                <textarea></textarea>
                </div>
            })}
        </div>
    );
};

export default QuestionCard;