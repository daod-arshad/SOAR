import React , { useState ,useEffect,useRef} from 'react';
import PieComponent from './PieComponent';
import LevelBarComponent from './LevelBarComponent';
import TableComponent from './TableComponent';
import GradientGauge from './GradientGauge';
import ColumnPlot from './ColumnPlot';
import QuarterPie from './QuarterPie';
import axios from "../axios.js"
import GaugePlot from './GaugePlot';
import MultiLinePlot from './MultiLinePlot';
import ScatterPlot from './ScatterPlot';
import {FilterOutlined}from '@ant-design/icons';
import { Breadcrumb, Layout, Typography, Avatar, DatePicker, Table, Popover } from 'antd';
import ResponsiveAppBar from "../homepage/AppBar";
const { Header, Footer, Content } = Layout;
const { Title, Text } = Typography;


function Main() {
  //var date='2023-02-16';

  const date = useRef("2023-02-16");
  
  const [data_pie_chart, setdata_pie_chart] = useState([])
  const [data_bar_chart, setdata_bar_chart] = useState([]);
  const [data_table, setdata_table] = useState([]);
  const [alertCount,setalertCount]=useState('');
  const [bruteforceIDCount,setbruteforceIDCount]=useState(0);
  const [data_columnPlot, setdata_columnPlot] = useState([]);
  const [playbookCount,setplaybookCount]=useState(0);
  //const [date,setdate]=useState("");
  //setdate("2023-02-16");

  
 useEffect(() => {
    console.log(date);
    axios.get("/Alert/receivePieChartData",{params: { query_date: date.current}}).then((response) => {
      console.log(response.data);
      setdata_pie_chart(response.data)
    },[]);
    axios.get("/Alert/receiveBarGraphData",{params: { query_date: date.current}}).then((response) => {
      console.log(response.data);
      setdata_bar_chart(response.data);
    },[]);
    axios.get("/Alert/receiveTableData",{params: { query_date:date.current}}).then((response) => {
      console.log(response.data);
      setdata_table(response.data);
    },[]);
    axios.get("/Alert/Columnplotwithslider",{params: { query_date:date.current}}).then((response) => {
      console.log(response.data);
      setdata_columnPlot(response.data);
    },[]);
    axios.get("/Alert/alertCount",{params: { query_date:date.current}}).then((response) => {
      console.log(response.data);
      setalertCount(response.data);
    },[]);
    axios.get("/Alert/alertCountRuleId",{params: { query_date:date.current}}).then((response) => {
      console.log(response.data);
      const res = response.data;
      for (const key in res){
        setbruteforceIDCount(res[key].count)
        
}
    },[]);
    axios.get("/result/playbookCount").then((response) => {
      console.log(response.data);
      const res = response.data;
      for (const key in res){
        setplaybookCount(res[key].TotalPlayBooksRun)
}
    },[]);
  }, [date]);

  return (
    <>
    <ResponsiveAppBar/>
    <Layout>
    
    <Layout>
    {/* <Header style={{background:'White' ,padding:10}}> 
    {/* <Avatar  style={{float:'right',paddingRight:6}} shape="square" size={32}  /> 
    <Title level={3}>SOAR</Title>
    </Header> */}
    
    <Content style={{ padding: '0 20px' ,background:'white',height:900, paddingTop:"2vh" }}>
    <div style={{ background:'White'}}> 
    <Popover placement="topLeft" title='Query Alert Stats by Date' trigger="hover">
    <FilterOutlined />
    </Popover>
    <Text style={{paddingRight: '5px',paddingLeft: '5px'}} strong></Text>
    <DatePicker style={{display: 'inline-block'}}  placement="bottomLeft"onChange={(date,dateString) =>date.current.changeData('2023-02-18')} />

    </div>
      <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>Security Events Summary</Breadcrumb.Item>
      <Breadcrumb.Item>Security Events Detail</Breadcrumb.Item>
      </Breadcrumb>
      <div>
      <div style={{width: '50%', border: '1px solid black',height: '260px', display: 'inline-block',padding: '0 30px'}}>
      <PieComponent data={data_pie_chart}/>
    
      </div>
      <div style={{width: '50%',border: '1px solid black', height: '260px', display: 'inline-block',padding: '0 30px'}}>
      <GradientGauge data1={alertCount} data2={bruteforceIDCount}/>
      </div>
      <div style={{width: '50%',border: '1px solid black', height: '260px', display: 'inline-block',padding: '0 30px'}}>
      <GaugePlot data1={alertCount} data2={playbookCount}/>
      </div>
      <div style={{width: '50%',border: '1px solid black', height: '260px', display: 'inline-block',padding: '0 30px'}}>
      <QuarterPie data={data_bar_chart}/>
      </div>
      <div style={{width: '50%',border: '1px solid black', height: '260px', display: 'inline-block',padding: '0 30px'}}>
      <LevelBarComponent data={data_columnPlot}/>
      </div>
      <div style={{width: '50%',border: '1px solid black', height: '260px', display: 'inline-block',padding: '0 30px'}}>
      <ScatterPlot/>
      </div>
     
    </div>
    </Content>
    <Footer style={{ textAlign: 'center' ,background:'white' }}>SOAR ©2023 Product by National Center Of Cyber Security, Karachi</Footer>
    </Layout>
    </Layout>
   
    </>
  )
}


export default Main;