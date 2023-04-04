import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';

function PieComponent(prop) {
   var data =prop.data 
      const config = {
        appendPadding: 10,
        //loading: data.length === 0,
        data,
        angleField: 'count',  //alert count
        colorField: '_id',  //name of OS
        radius: 0.8,
        label: {
          type: 'inner',
          offset: '-30%',
          content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
          style: {
            fontSize: 14,
            textAlign: 'center',
          },
        },
        interactions: [
          {
            type: 'element-active',
          },
        ],
      };
  return <Pie {...config} /> ;
  
}
export default PieComponent;