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
import { Breadcrumb, Layout, Typography, Descriptions, DatePicker, Table, Popover } from 'antd';
import ResponsiveAppBar from "../homepage/AppBar";
import { fontWeight } from '@mui/system';
const { Header, Footer, Content } = Layout;
const { Title, Text } = Typography;


function Main() {
  //var date='2023-02-16';

  const [dAte, setDate] = useState("2023-02-16");
  
  const [data_pie_chart, setdata_pie_chart] = useState([])
  const [data_bar_chart, setdata_bar_chart] = useState([]);
  const [data_table, setdata_table] = useState([]);
  const [alertCount,setalertCount]=useState('');
  const [bruteforceIDCount,setbruteforceIDCount]=useState(0);
  const [data_columnPlot, setdata_columnPlot] = useState([]);
  const [playbookCount,setplaybookCount]=useState(0);
  //const [date,setdate]=useState("");
  //setdate("2023-02-16");

  const [active,setactive]=useState('chart');
  const [divsHidden, setDivsHidden] = useState(false);
  const [summary, setsummary] = useState(false);
  const [detail, setdetail] = useState(false);
  const handlebredcrumClick1 = () => {
    setsummary(true);
    setdetail(false);
    setDivsHidden(true);
    setactive('table');
  };
  const handlebredcrumClick2 = () => {
    setsummary(false);
    setdetail(true);
    setDivsHidden(false);
    setactive('chart');
  };

  
 useEffect(() => {
   console.log(dAte);
   axios
     .get("/Alert/receivePieChartData", { params: { query_date: dAte } })
     .then((response) => {
       console.log(response.data);
       setdata_pie_chart(response.data);
     }, []);
   axios
     .get("/Alert/receiveBarGraphData", { params: { query_date: dAte } })
     .then((response) => {
       console.log(response.data);
       setdata_bar_chart(response.data);
     }, []);
   axios
     .get("/Alert/receiveTableData", { params: { query_date: dAte } })
     .then((response) => {
       console.log(response.data);
       setdata_table(response.data);
     }, []);
   axios
     .get("/Alert/Columnplotwithslider", { params: { query_date: dAte } })
     .then((response) => {
       console.log(response.data);
       setdata_columnPlot(response.data);
     }, []);
   axios
     .get("/Alert/alertCount", { params: { query_date: dAte } })
     .then((response) => {
       console.log(response.data);
       setalertCount(response.data);
     }, []);
   axios
     .get("/Alert/alertCountRuleId", { params: { query_date: dAte } })
     .then((response) => {
       console.log(response.data);
       const res = response.data;
       for (const key in res) {
         setbruteforceIDCount(res[key].count);
       }
     }, []);
   axios.get("/result/playbookCount").then((response) => {
     console.log(response.data);
     const res = response.data;
     for (const key in res) {
       setplaybookCount(res[key].TotalPlayBooksRun);
     }
   }, []);
 }, [dAte]);

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
              <DatePicker style={{ display: 'inline-block' }} placement="bottomLeft" onChange={(prevDate,dateString) => {
                console.log(dateString)
                // date.current = dateString
                setDate(dateString)
                console.log(dAte);
              }} />

    </div>
      <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item onClick={handlebredcrumClick2} style={detail ? { fontWeight: "bold",color: "black" } : {color: "black"}}
      >Security Events Summary</Breadcrumb.Item>
      <Breadcrumb.Item onClick={handlebredcrumClick1} style={summary ? { fontWeight: "bold",color: "black" } : {color: "black"}}
      >Security Events Detail</Breadcrumb.Item>
       </Breadcrumb>
     
      <div style={divsHidden ? { display: 'none' } : {}}>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
      <div style={{width: '50%', border: '1px solid black', height: '260px', display: 'inline-block', padding: '0 30px'}}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%'}}>
          {active === 'chart' && <PieComponent data={data_pie_chart}/>}
          <Descriptions><Descriptions.Item>Alert Count based on Operating System</Descriptions.Item></Descriptions> 
        </div>
      </div>
      <div style={{width: '50%', border: '1px solid black', height: '260px', display: 'inline-block', padding: '0 30px'}}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%'}}>
          {active === 'chart' && <GradientGauge data1={alertCount} data2={bruteforceIDCount}/>}
          <Descriptions><Descriptions.Item>Brute Force</Descriptions.Item></Descriptions> 
        </div>
      </div>
      <div style={{width: '50%', border: '1px solid black', height: '260px', display: 'inline-block', padding: '0 30px'}}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%'}}>
          {active === 'chart' && <GaugePlot data1={alertCount} data2={playbookCount}/>}
          <Descriptions><Descriptions.Item>Gauge Plot</Descriptions.Item></Descriptions> 
        </div>
      </div>
      <div style={{width: '50%', border: '1px solid black', height: '260px', display: 'inline-block', padding: '0 30px'}}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%'}}>
          {active === 'chart' && <QuarterPie data={data_bar_chart}/>}
          <Descriptions><Descriptions.Item>Quarter Pie</Descriptions.Item></Descriptions> 
        </div>
      </div>
      <div style={{width: '50%', border: '1px solid black', height: '260px', display: 'inline-block', padding: '0 30px'}}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%'}}>
          {active === 'chart' && <LevelBarComponent data={data_columnPlot}/>}
          <Descriptions><Descriptions.Item>Level Bar</Descriptions.Item></Descriptions> 
        </div>
      </div>
      <div style={{width: '50%', border: '1px solid black', height: '260px', display: 'inline-block', padding: '0 30px'}}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%'}}>
          {active === 'chart' && <ScatterPlot/>}
          <Descriptions><Descriptions.Item>Scatter Plot</Descriptions.Item></Descriptions> 
        </div>
      </div>
    </div>
    </div>
    <div >
     {active==='table' && <TableComponent data={data_table}/>}
    </div>
   
    
    </Content>
    <Footer style={{ textAlign: 'center' ,background:'white', margin:'0px', paddingTop:'0px',paddingBottom:"2vh" }}>SOAR ©2023 Product by National Center Of Cyber Security, Karachi</Footer>
    </Layout>
    </Layout>
   
    </>
  )
}


export default Main;