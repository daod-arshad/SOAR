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
      title: 'agent.name',
      dataIndex: 'agentName',
      key: 'agentName',
    },
    {
      title: 'rule.description',
      dataIndex: 'ruleDescription',
      key: 'ruleDescription',
    },
    {
      title: 'rule.level',
      dataIndex: 'ruleLevel',
      key: 'ruleLevel',
    },
    {
      title: 'rule.id',
      dataIndex: 'ruleId',
      key: 'ruleId',
    },
  ];

  return (
    <Table columns={columns} dataSource={data} />
  );

}
export default TableComponent;