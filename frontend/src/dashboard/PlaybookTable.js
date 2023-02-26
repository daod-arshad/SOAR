import React from 'react';
import { Space, Table, Tag } from 'antd';
function PlaybookTable(prop){



  const data=prop.data;
  console.log(data)

  const columns22 = [
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time'
    },
    {
        title: 'date',
        dataIndex: 'date',
        key: 'date',
      },
    {
      title: 'noOfPlaybooks',
      dataIndex: 'noOfPlaybooks',
      key: 'noOfPlaybooks',
    },
  
    {
      title: 'data',
      dataIndex: 'data',
      key: 'data',
    },
  
  ];
  const columns = [
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time'
    },
  
    {
      title: 'data',
      dataIndex: 'data',
      key: 'data',
    },
  
  ];

  return (
    <Table columns={columns} dataSource={data} />
  );
}
export default PlaybookTable;