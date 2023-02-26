import React from 'react'
import { Scatter } from '@ant-design/plots';
import {Description} from 'antd'
function ScatterPlot() {
    var data=[
        {
          "Agent Name": "Dawood",
          "ID": "117",
          "Alerts": 16
        },
        {
          "Agent Name": "Standalone",
          "ID": "101",
          "Alerts": 25
        },
        {
          "Agent Name": "NCCS",
          "ID": "000",
          "Alerts": 12        },
          {
            "Agent Name": "Dawood",
            "ID": "117",
            "Alerts": 19
          },
          {
            "Agent Name": "Standalone",
            "ID": "101",
            "Alerts": 4
          },
          {
            "Agent Name": "NCCS",
            "ID": "000",
            "Alerts": 1
          },
          {
              "Agent Name": "NCCS",
              "ID": "000",
              "Alerts": 16
          },
          {
                "Agent Name": "NCCS",
                "ID": "000",
                "Alerts": 10
          },
        {
        "Agent Name": "NCCS",
                  "ID": "000",
                  "Alerts": 14
          },
         ]

    const config = {
        appendPadding: 10,
        data,
        xField: 'Alerts',
        yField: 'Agent Name',
        shape: 'circle',
        colorField: 'ID',
        size: 4,
   
        yAxis: {
          nice: true,
          line: {
            style: {
              stroke: '#aaa',
            },
          },
        },
        xAxis: {
          min: 0,
          grid: {
            line: {
              style: {
                stroke: '#eee',
              },
            },
          },
          line: {
            style: {
              stroke: '#aaa',
            },
          },
        },
      };
    
      return <Scatter {...config} />;
}
export default ScatterPlot;