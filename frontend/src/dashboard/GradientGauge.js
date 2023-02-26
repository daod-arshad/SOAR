import React ,{useRef,useEffect} from 'react'
import { Gauge } from '@ant-design/plots';

function GradientGauge(prop) {  //2 props total alerts and rule level ID  (60106) triggered count
    const ticks = [0, 1 / 3, 2 / 3, 1];
    const color = ['#F4664A', '#FAAD14', '#30BF78'];
   console.log(prop.data1)
   console.log(prop.data2)

    // const graphRef = useRef(null);
    // useEffect(() => {
    //   if (graphRef.current) {
    //     let data = 0.7;
    //     const interval = setInterval(() => {
    //       if (data >= 1.5) {
    //         clearInterval(interval);
    //       }
  
    //       data += 0.005;
    //       graphRef.current.changeData(data > 1 ? data - 1 : data);
    //     }, 100);
    //   }
    // }, [graphRef]);
    
    var per=(prop.data2/prop.data1)
    console.log(per)

    const config = {
      percent: per,
      range: {
        ticks: [0, 1 / 3, 2 / 3, 1],
        color: ['#30BF78', '#FAAD14','#F4664A'],
      },
      indicator: {
        pointer: {
          style: {
            stroke: '#D0D0D0',
          },
        },
        pin: {
          style: {
            stroke: '#D0D0D0',
          },
        },
      },
      statistic: {
        title: {
          formatter: ({ percent }) => {
            if (percent < ticks[1]) {
              return 'Stable';
            }
  
            else if (percent < ticks[2]) {
              return 'Alarming';
            }
            else
            return 'Danger';
          },
          style: ({ percent }) => {
            return {
              fontSize: '16px',
              lineHeight: 1,
              color: percent < ticks[1] ? color[0] : percent < ticks[2] ? color[1] : color[2],
            };
          },
        },
      
      },
    };
    
  
    return <Gauge {...config} />;
}

export default GradientGauge;
