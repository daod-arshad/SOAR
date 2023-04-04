import React from 'react'
import { Scatter } from '@ant-design/plots';
import {Description} from 'antd'
function ScatterPlot(prop) {
    var data=prop.data;
    console.log(data)

    const config = {
        appendPadding: 10,
        data,
        xField: 'count',
      yField: '_id',
      shape: 'circle',
      colorField: 'Level',
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