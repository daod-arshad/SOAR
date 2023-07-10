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
import { Breadcrumb, Layout, Typography, Descriptions,Select, DatePicker, Table, Popover } from 'antd';
import ResponsiveAppBar from "../homepage/AppBar";
import { fontWeight } from '@mui/system';
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import dayjs from 'dayjs';
// import Typography from "@mui/material/Typography";
const {RangePicker}=DatePicker;
const {Option}=Select;
const { Header, Footer, Content } = Layout;
const { Title, Text } = Typography;



function Main() {

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedTime, setSelectedTime] = useState(null);
  const [passedTime, setPassedTime] = useState('');

  useEffect(() => {
    const today = dayjs();
    setStartDate(today.format('YYYY-MM-DD'));
    setEndDate(today.format('YYYY-MM-DD'));
  }, []);
  
  
  const disabledDate=(current) =>{
    // Disable dates after today
    return current && current > dayjs().endOf('day');
  }

  const handleDateChange = (dates) => {
    if (dates) {
      const [start, end] = dates;
  
      if (start && end) {
        setStartDate(dayjs(start).format('YYYY-MM-DD'));
        setEndDate(dayjs(end).format('YYYY-MM-DD'));}
   
    }
    console.log(startDate,endDate)
  };
  useEffect(() => {setPassedTime(
    // selectedTime &&
       (selectedTime === "5"? 5: selectedTime === "30"? 30: selectedTime === "60"? 60:
       selectedTime === "360"? 360:selectedTime==="720"?720: null));
 }, [selectedTime]);
 //console.log(passedTime)

const handleTimeChange = (value) => {
   setSelectedTime(value);
   //console.log(passedTime)
 };
const isToday =
startDate && endDate &&
dayjs(startDate).isSame(endDate, "day") &&
dayjs(startDate).isSame(dayjs(), "day");
  
//var date='2023-02-16';

  //const [dAte, setDate] = useState("2023-02-16");
  
  const [data_pie_chart, setdata_pie_chart] = useState([])
  const [data_bar_chart, setdata_bar_chart] = useState([]);
  const [data_table, setdata_table] = useState([]);
  const [scatterPlotData,setscatterPlotData]=useState([]);
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
   
   axios
     .get("/Alert/receivePieChartData", { params: { query_date1: startDate,query_date2:endDate,query_time:passedTime } })
     .then((response) => {
       console.log(response.data);
       setdata_pie_chart(response.data);
     }, []);
   axios
     .get("/Alert/receiveBarGraphData", { params: {query_date1: startDate,query_date2:endDate,query_time:passedTime } })
     .then((response) => {
       console.log(response.data);
       setdata_bar_chart(response.data);
     }, []);
   axios
     .get("/Alert/receiveTableData", { params: {query_date1: startDate,query_date2:endDate,query_time:passedTime} })
     .then((response) => {
       console.log(response.data);
       setdata_table(response.data);
     }, []);
   axios
     .get("/Alert/Columnplotwithslider", { params: {query_date1: startDate,query_date2:endDate,query_time:passedTime } })
     .then((response) => {
       console.log(response.data);
       setdata_columnPlot(response.data);
     }, []);
    axios.get("/Alert/scatter",{params: { query_date1:startDate,query_date2:endDate,query_time:passedTime}}).then((response) => {
      console.log(response.data);
      setscatterPlotData(response.data);
    },[]);
   axios
     .get("/Alert/alertCount", { params: {query_date1: startDate,query_date2:endDate,query_time:passedTime} })
     .then((response) => {
       console.log(response.data);
       setalertCount(response.data);
     }, []);
   axios
     .get("/Alert/alertCountRuleId", { params: {query_date1: startDate,query_date2:endDate,query_time:passedTime} })
     .then((response) => {
       console.log(response.data);
       const res = response.data;
       if (res.length==0){
        setbruteforceIDCount(0);
       }
       else{
       for (const key in res) {
         setbruteforceIDCount(res[key].count);
       }}
     }, []);
   axios.get("/result/playbookCount" ,{params: { query_date1:startDate,query_date2:endDate,query_time:passedTime}}).then((response) => {
     console.log(response.data);
     setplaybookCount(response.data)
   }, []);
 }, [startDate,endDate,passedTime]);

  return (
    <>
    <ResponsiveAppBar/>
    <Layout>
    
    <Layout>
    
    <Content style={{ padding: '0 20px' ,background:'white', paddingTop:"2vh", paddingBottom:"5vh" }}>
    <div style={{ background:'White'}}> 
    <Popover placement="topLeft" title='Query Alert Stats by Date' trigger="hover">
    <FilterOutlined />
    </Popover>
    <Text style={{paddingRight: '5px',paddingLeft: '5px'}} strong></Text>
   
  <RangePicker  onChange={handleDateChange}  disabled={[false,false]} disabledDate={disabledDate} />
    {isToday &&
        <Select value={selectedTime} style={{ width: 165 }} placeholder="Select Time Range"onChange={handleTimeChange}>
          <Select.Option value="5">Last 5 min</Select.Option>
          <Select.Option value="30">Last 30 min</Select.Option>
          <Select.Option value="60">Last 1 hour</Select.Option>
          <Select.Option value="360">Last 6 hour</Select.Option>
          <Select.Option value="720">Last 12 hour</Select.Option>
        </Select>
      }

    </div>
      <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item onClick={handlebredcrumClick2} style={detail ? { fontWeight: "bold",color: "black" } : {color: "black"}}
      >Security Events Summary</Breadcrumb.Item>
      <Breadcrumb.Item onClick={handlebredcrumClick1} style={summary ? { fontWeight: "bold",color: "black" } : {color: "black"}}
      >Security Events Detail</Breadcrumb.Item>
       </Breadcrumb>
     
      <div style={divsHidden ? { display: 'none' } : {}}>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
        <Box sx={{ width: "60vw", marginBottom:"4vh" }}>
          <Card variant='outlined'>
        <div style={{display: 'flex', padding:"1.5vw 1.5vw 0vw 1.5vw", flexDirection: 'column', justifyContent: 'space-between', height: '100%'}}>
                      {active === 'chart' && <LevelBarComponent data={data_columnPlot} />}
                      <CardContent><Title style={{margin:"0", padding:"0"}} level={4}>Alerts Per Agent</Title></CardContent>
                  </div>    
          </Card>
        
                </Box>
                
        <Box sx={{ minWidth: "35vw", marginBottom:"4vh" }}>
          <Card variant='outlined'>
                <div style={{ display: 'flex',padding:"1.5vw 1.5vw 0vw 1.5vw", flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                      {active === 'chart' && <GradientGauge data1={alertCount} data2={bruteforceIDCount} />}
                      <CardContent><Title style={{margin:"0", padding:"0"}} level={4}>Brute Force Alerts</Title></CardContent>
                  </div>
                  </Card>
                  </Box>
        <Box sx={{ minWidth: "30vw", marginBottom:"4vh", marginLeft:"10vw" }}>
          <Card variant='outlined'>
                <div style={{ display: 'flex',padding:"1.5vw 1.5vw 0vw 1.5vw", flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                      {active === 'chart' && <GaugePlot data1={alertCount} data2={playbookCount} />}
                      <CardContent><Title style={{margin:"0", padding:"0"}} level={4}>Playbooks Executed vs Alerts</Title></CardContent>
                    </div>
                  </Card>
                  </Box>
        <Box sx={{ minWidth: "30vw", marginBottom:"4vh", marginRight:"10vw" }}>
          <Card variant='outlined'>
                <div style={{ display: 'flex',padding:"1.5vw 1.5vw 0vw 1.5vw", flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                      {active === 'chart' && <QuarterPie data={data_bar_chart} />}
                      <CardContent><Title style={{margin:"0", padding:"0"}} level={4}>Quarter Pie</Title></CardContent>
                    </div>
                  </Card>
                  </Box>
        <Box sx={{ minWidth: "35vw", marginBottom:"4vh" }}>
          <Card variant='outlined'>
                <div style={{ display: 'flex',padding:"1.5vw 1.5vw 0vw 1.5vw", flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                      {active === 'chart' && <PieComponent data={data_pie_chart} />}
                      <CardContent><Title lstyle={{margin:"0", padding:"0"}} level={4}>Alerts per Decoder</Title></CardContent>
                    </div>
                  </Card>
                  </Box>
        <Box sx={{ minWidth: "60vw", marginBottom:"4vh" }}>
          <Card variant='outlined'>
                <div style={{ display: 'flex',padding:"1.5vw 1.5vw 0vw 1.5vw", flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                      {active === 'chart' && <ScatterPlot data={scatterPlotData} />}
                      <CardContent><Title style={{margin:"0", padding:"0"}} level={4}>Alerts over a range</Title></CardContent>
                    </div>
                  </Card>
                  </Box>
      
    </div>
    </div>
    <div >
     {active==='table' && <TableComponent data={data_table}/>}
    </div>
   
    
    </Content>
    {/* <Footer style={{ textAlign: 'center' ,background:'white', margin:'0px', paddingTop:'0px',paddingBottom:"2vh" }}>SOAR ©2023 Product by National Center Of Cyber Security, Karachi</Footer> */}
    </Layout>
    </Layout>
   
    </>
  )
}


export default Main;