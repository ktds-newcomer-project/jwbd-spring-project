import React, { useState, useLayoutEffect } from 'react';
import { Area } from '@ant-design/plots';

const AntGraph = () => {
  const [data, setData] = useState([]);
  const [ middle, setMiddle ] = useState('');

  useLayoutEffect(() => {
    asyncFetch();
  }, [middle]);

  const asyncFetch = async() => {
    await setData([
    {
        "Score" : 0,
        "scales" : 0
    },
    {
       "Score" : 10,
       "scales" : 5
    },
    {
        "Score" : 20,
        "scales" : 2
    },
    {
        "Score" : 37,
        "scales" : 8
    },
    {
        "Score" : 41,
        "scales" : 7
    },
    {
        "Score" : 53,
        "scales" : 10
    },
    {
        "Score" : 60,
        "scales" : 8
    },
    {
        "Score" : 70,
        "scales" : 5
    },
    ])
    // fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
    //   .then((response) => response.json())
    //   .then((json) => setData(json))
    //   .catch((error) => {
    //     console.log('fetch data failed', error);
    //   });
    let man = 0
    let allScore = 0
    const middlePoint = () => data.map((item) => {
        allScore += (item.Score * item.scales)
        man += item.scales
    })
    middlePoint()
    let middleScore = allScore / man
    middleScore = middleScore - (middleScore % 10)
    console.log(middleScore)
    setMiddle(String(middleScore))
    // if (data) {
    //     setMiddle(20)
    // }
  };
  const config = {
    data,
    xField: 'Score',
    yField: 'scales',
    width: 400,
    autoFit: true,
    xAxis : {
        tickCount : '10',
    },
    annotations: [
      {
        type: 'text',
        position: ['median', 'median'],
        content: '평균점수',
        offsetY: -4,
        style: {
          textBaseline: 'bottom',
        },
      },
      {
        type: 'line',
        start: [middle , 'min'],
        end: [middle, 'max'],
        style: {
          stroke: 'red',
          lineDash: [3, 3],
        },
      },
    ],
  };

  return <Area {...config} />;
};


export default AntGraph;