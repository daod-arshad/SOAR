import React from 'react'
import { Column } from '@ant-design/plots';
function ColumnPlot(prop) {
 var data=prop.data
 console.log(data)
    const config = {
        data,
        xField: '_id',
        yField: 'count',
        xAxis: {
          label: {
            autoRotate: false,
          },
        },
       color: '#a8ddb5'
        
        //slider: {
        //  start: 0.01,
        //  end: 0.02,
        //},
      };
    
      return <Column {...config} />;
}

export default ColumnPlot;
