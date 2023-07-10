import React from 'react';
import { Space, Table, Tag } from 'antd';
function TableComponent(prop){
  const data=prop.data;
  const columns = [
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time'
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'Agent Name',
      dataIndex: 'agentName',
      key: 'agentName',
    },
    {
      title: 'Rule Description',
      dataIndex: 'ruleDescription',
      key: 'ruleDescription',
    },
    {
      title: 'Rule Level',
      dataIndex: 'ruleLevel',
      key: 'ruleLevel',
    },
    {
      title: 'Rule Id',
      dataIndex: 'ruleId',
      key: 'ruleId',
    },
  ];

  return (
    <Table columns={columns} dataSource={data} />
  );

}
export default TableComponent;