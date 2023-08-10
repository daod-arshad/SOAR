import React, { useState, useEffect} from "react";
import { Dropdown, Menu,Table,Button} from "antd";
import axios from "../axios.js";
import ResponsiveAppBar from "../homepage/AppBar.js";
import { DownOutlined,UpOutlined } from '@ant-design/icons';

function PlaybookTable() {
  const [playbookData, setplaybookData] = useState([]);
  useEffect(() => {
    axios.get("/result/playbookExecution").then((response) => {
      console.log(response.data);
      setplaybookData(response.data);
    }, []);
  }, []);
  const buttonStyle = {
    color: '#6c2f4a', 
    borderColor: 'transparent',
    fontWeight: 'bold',
  };

  
  const CustomCell = ({ record }) => {
    const [showHiddenData, setShowHiddenData] = useState(false);
  
    const toggleHiddenData = () => {
      setShowHiddenData(!showHiddenData);
    };
  
    return (
      <div>
        <Button type="link" style={buttonStyle} onClick={toggleHiddenData}>
          {showHiddenData ? <UpOutlined /> : <DownOutlined />} Execution Result
        </Button>
        {showHiddenData &&( <div>{record.data}</div>
      )}
      </div>
    );
  };
  const col = [
   
    {
      title: "date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "noOfPlaybooks",
      dataIndex: "noOfPlaybooks",
      key: "noOfPlaybooks",
    },

    {
      title: "data",
      dataIndex: "data",
      key: "data",
      render: (_, record) => <CustomCell record={record} />,
    },
  ];


  return (
    <>
      <ResponsiveAppBar />
      <h1>Playbook Execution Result</h1>
      <Table
        columns={col}
        dataSource={playbookData}
        style={{ height: "100vh", whiteSpace: "pre-wrap" }}
      />
      
    </>

  );
}
export default PlaybookTable;

