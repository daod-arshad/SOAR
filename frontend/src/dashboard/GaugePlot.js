import React from 'react'
import { Gauge } from '@ant-design/plots';

 function GaugePlot(prop) {
    var alerts=prop.data1;
    var playbooks_executed=prop.data2
    
    const config = {
        percent: playbooks_executed/alerts,
        range: {
          color: '#eb2f96',
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
        axis: {
          label: {
            formatter(v) {
              return (Number(v) * alerts).toFixed(0);
            },
          },
          subTickLine: {
            count: 3,
          },
        },
        statistic: {
          content: {
            formatter: ({ percent }) => `Executed Playbooks: ${(percent * 100).toFixed(0)}%`,
            style: {
              color: 'rgba(0,0,0,0.65)',
              fontSize: 14,
            },
          },
        },
      };
      return <Gauge {...config} />;
}
export default GaugePlot;

