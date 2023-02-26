import React, { useState, useEffect, useRef } from "react";
import { Space, Table, Tag } from "antd";
import axios from "../axios.js";
function PlaybookTable() {
  const [playbookData, setplaybookData] = useState([]);
  useEffect(() => {
    axios.get("/result/find").then((response) => {
      console.log(response.data);
      setplaybookData(response.data);
    }, []);
  }, []);

  const columns22 = [
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "date",
      dataIndex: "date",
      key: "date",
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
    },
  ];
  const columns = [
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },

    {
      title: "data",
      dataIndex: "data",
      key: "data",
    },
  ];

  return <Table columns={columns} dataSource={playbookData} style={{
    height: "100vh" 
  }} />;
}
export default PlaybookTable;
