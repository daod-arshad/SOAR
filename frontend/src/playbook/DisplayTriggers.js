import React, { useState, useEffect } from "react";
import { Table ,Space,notification} from "antd";
import axios from "../axios.js";
import ResponsiveAppBar from "../homepage/AppBar.js";
import { DeleteOutlined } from '@ant-design/icons';


function DisplayTriggers() {
    
    const [Triggers, setTriggers] = useState([]);
    useEffect(() => {
    axios.get("/triggers/all").then((response) => {
     
      setTriggers(response.data);
    }, []);
    }, []);
    const handleDelete=(_id)=>{
        axios
        .delete('triggers/delete',{params: {_id: _id}}) 
        .then((response) => {
            showSuccessNotification();
           setTriggers((prev) => prev.filter((item) => item.ruleId !== _id));
        })
        .catch((error) => {
          console.error('Error deleting record:', error);
          showErrorNotification();
        });
    }
    const columns = [
       
    
        {
          title: "Date",
          dataIndex: "date",
          key: "date",
        },
        {
          title: "Time",
          dataIndex: "time",
          key: "time",
        },
        {
          title: "Is Enabled",
          dataIndex: "isEnabled",
          key: "isEnabled",
          render: (isEnabled) => (isEnabled ? 'Yes' : 'No')
        },
        {
            title: "Rule ID",
            dataIndex: "ruleId",
            key: "ruleId",
          },
          {
            title: 'Playbooks',
            dataIndex: 'node',
            key: 'node',
            render: (playbooks) => (
              <ol>
              {playbooks.map((playbook) => (
                <li key={playbook}> {playbook}</li>
              ))}
            </ol>
            ),
          },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
              <Space>
                <DeleteOutlined style={{ color: 'red' }} onClick={() => handleDelete(record.ruleId)} />
              </Space>
            ),
          }
      ];
      const showSuccessNotification = () => {
        notification.success({
          message: 'Trigger Deleted',
          description: 'Trigger has been deleted successfully!',
          duration: 3, 
          placement:'top'
        });
      };
      const showErrorNotification = () => {
        notification.error({
          message: 'Error',
          description: 'An error occurred while deleting the trigger. Please try again.',
          duration: 3, 
          placement: 'top',
        });
      };
  return (
    <>
    <ResponsiveAppBar />
    <h1>Custom Triggers</h1>
      <Table
        rowKey="ruleId"
        columns={columns}
        dataSource={Triggers}
        
        style={{ height: "100vh", whiteSpace: "pre-wrap", paddingLeft: '16px', paddingRight: '16px' , paddingTop:'16px'}}
      />
    </>
  )
}

export default DisplayTriggers;
