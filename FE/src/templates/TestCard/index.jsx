import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './style.css'
import { useNavigate } from 'react-router-dom';

const TestCard = ({cardImage,title, dueDate}) => {
    const navigate = useNavigate();
    const gotoResult = () => {
        console.log('이거',title)
        navigate('/result', {
            state : {
                title : title,
            }
        })
    }
    return (
            <Card onClick={gotoResult} className="cardHover" sx={{ width:'100%',maxWidth: 305,margin: "5%",marginBottom:"4%", border: '1px solid #DBDBDB'}}>
                <CardMedia
                component="img"
                height="140"
                image={cardImage}
                style={{borderBottom: '1px solid #DBDBDB',objectFit:'fill'}}
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {dueDate}
                </Typography>
                </CardContent>
            </Card>
    );
};

export default TestCard;