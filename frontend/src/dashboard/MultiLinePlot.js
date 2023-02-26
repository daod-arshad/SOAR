import React from 'react';
import { Line } from '@ant-design/plots';

function MultiLinePlot(prop) {
    //var data=prop.data
    //console.log(data)
    var data=[
        {
          "_id.agentName": "10",
          "_id.AgentId": "120",
          "count": 200
        },
        {
          "_id.agentName": "10",
          "_id.AgentId": "001",
          "count": 500
        },
        {
            "_id.agentName": "20",
            "_id.AgentId": "120",
            "count": 600
          },
          {
            "_id.agentName": "20",
            "_id.AgentId": "001",
            "count": 1200
          },
        ]

        const config = {
            data,
            xField: '_id.agentName',
            yField: 'count',
            seriesField: '_id.AgentId',
            
            legend: {
              position: 'top',
            },
            smooth: true,
            // @TODO 后续会换一种动画方式
            animation: {
              appear: {
                animation: 'path-in',
                duration: 5000,
              },
            },
          };
      return <Line {...config} />;
    };    





export default MultiLinePlot;