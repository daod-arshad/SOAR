import React from 'react'
import { Gauge } from '@ant-design/plots';

 function GaugePlot(prop) {
    var alerts=prop.data1;
    var playbooks_executed=prop.data2
    console.log(alerts,playbooks_executed)
    console.log(playbooks_executed / alerts)
    var percentage = (alerts > 0) ? (playbooks_executed / alerts) : ((playbooks_executed > 0) ? 0 : 0);
    if (percentage>1){  // when executed playbooks are greater then alert count, make it 0%
      percentage=0
    }
    
    const config = {
        percent: percentage,
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

