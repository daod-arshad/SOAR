import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Bar } from '@ant-design/plots';
 function LevelBarComponent(prop) {
  var data=prop.data
        const config = {
            data,
            //loading: data.length === 0,
            xField: 'count',
            yField: '_id',  //alert level
            seriesField: '_id',
            legend: {
              position: 'top-left',
            },
           
          }; 
    return <Bar {...config} />;
}
export default LevelBarComponent;