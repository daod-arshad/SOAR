import React from 'react'
import {Pie} from '@ant-design/plots'
function QuarterPie(prop) {
    var data=prop.data;
 
    const config = {
        appendPadding: 10,
        data,
        angleField: 'count',
        colorField: '_id',
        radius: 1,
     
        startAngle: Math.PI,
        endAngle: Math.PI * 1.5,
        label: {
          type: 'inner',
          offset: '-8%',
          
          style: {
            fontSize: 12
          },
        },
        interactions: [
          {
            type: 'element-active',
          },
        ],
        pieStyle: {
          lineWidth: 0,
        },
      };
      return <Pie {...config} />;
    };

export default QuarterPie;
