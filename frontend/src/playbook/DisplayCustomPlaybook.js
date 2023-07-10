import React, { useState, useEffect } from "react";
import { Table ,Space,notification} from "antd";
import axios from "../axios.js";
import ResponsiveAppBar from "../homepage/AppBar.js";
import { DeleteOutlined } from '@ant-design/icons';




function DisplayCustomPlaybook() {

    const [CustomPlaybooks, setCustomPlaybooks] = useState([]);
    useEffect(() => {
    axios.get("/result/CustomPlaybooks").then((response) => {
      console.log(response.data);
      setCustomPlaybooks(response.data);
    }, []);
  }, []);
  const handleDelete=(id)=>{
    axios
    .delete('result/deleteCustomPlaybook',{params: {id: id}})
    .then((response) => {
        showSuccessNotification();
       // Update the CustomPlaybook state by removing the deleted record
       setCustomPlaybooks((prevPlaybook) => prevPlaybook.filter((item) => item.id !== id));
    })
    .catch((error) => {
      // Handle error
      console.error('Error deleting record:', error);
      showErrorNotification();
    });
}

    const columns = [
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
        },
    
        {
          title: "Playbook Name",
          dataIndex: "playbook_name",
          key: "playbook_name",
        },
        {
          title: "Playbook Display Name",
          dataIndex: "playbook_display_name",
          key: "playbook_display_name",
        },
        {
          title: "Playbook Inputs",
          dataIndex: "playbook_inputs",
          key: "playbook_inputs",
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
              <Space>
                <DeleteOutlined style={{ color: 'red' }} onClick={() => handleDelete(record.id)} />
              </Space>
            ),
          },
      ];
      const showSuccessNotification = () => {
        notification.success({
          message: 'Playbook Deleted',
          description: 'Playbook has been deleted successfully!',
          duration: 3, 
          placement:'top'
        });
      };
      const showErrorNotification = () => {
        notification.error({
          message: 'Error',
          description: 'An error occurred while deleting the playbook. Please try again.',
          duration: 3, 
          placement: 'top',
        });
      };
  return (
    <>
  
      <ResponsiveAppBar />
      <Table
        rowKey="id"
        columns={columns}
        dataSource={CustomPlaybooks}
        
        style={{ height: "100vh", whiteSpace: "pre-wrap", paddingLeft: '16px', paddingRight: '16px' , paddingTop:'16px'}}
      />
      
    </>
  )
}

export default DisplayCustomPlaybook;

