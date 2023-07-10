import {React,useState }from 'react';
import ResponsiveAppBar from "../homepage/AppBar";
import { Form,Button,Input,Typography,InputNumber,Select,Row,Col,notification} from 'antd';
import axios from "../axios.js"


const {Title}=Typography;

async function generateUniqueIdentifier(selectionType) {
  let prefix = '';
  if (selectionType === 'linux') {
    prefix ='CusLin';
    const uniqueIdentifier=`${prefix}${Math.floor(Math.random()*10000)}`;
    const exists = await checkUniqueIdentifier(uniqueIdentifier, selectionType);
    if (exists) {
    // ID already exists, generate a new one recursively
    return generateUniqueIdentifier(selectionType);
  } else if (!exists){
    // ID doesn't exist, return the unique identifier
    return uniqueIdentifier;
  }
  } else if (selectionType === 'windows') {
    prefix ='CusWin';
    const uniqueIdentifier=`${prefix}${Math.floor(Math.random()*10000)}`;
    const exists = await checkUniqueIdentifier(uniqueIdentifier, selectionType);
    if (exists) {
    return generateUniqueIdentifier(selectionType);
  } else if (!exists) {
    console.log(29)
    return uniqueIdentifier;
  }
  } else {
    prefix ='CusOther';
    const uniqueIdentifier=`${prefix}${Math.floor(Math.random()*10000)}`;
    const exists = await checkUniqueIdentifier(uniqueIdentifier, selectionType);
    if (exists) {
    return generateUniqueIdentifier(selectionType);
  } else if (!exists) {
    return uniqueIdentifier;
  }
  }
  
}
async function checkUniqueIdentifier(uniqueIdentifier,selectionType){
  let endpoint = '';
  if (selectionType === 'linux') {
    endpoint = '/linuxPlaybooks/findOne';
  } else if (selectionType === 'windows') {
    endpoint = '/windowsPlaybooks/findOne';
  } else {
    endpoint = '/otherPlaybooks/findOne';
  }
  try {
    const response = await axios.get(endpoint, {
      params: { id: uniqueIdentifier }
    });
    console.log(response.data.exists)
    return response.data.exists;
  } catch (error) {
    console.error('Error occurred while checking ID existence:', error);
    throw error; 
  }
}

function CreateCustomPlaybook() {
  const [form] = Form.useForm();

  const [numFields, setNumFields] = useState(0);
  const handleInputChange = (e) => {
    setNumFields(e);
  };
  const renderFields = (count) => {
    const fields = [];
    for (let i = 0; i <count; i++) {
      fields.push(
        <div key={i} style={{ marginBottom: '10px' }}>
           <Row gutter={16}>
            <Col span={8}>
          <Form.Item
            name={[`playbook_placeholder_${i}`]}
            label={`Placeholder ${i + 1}`}
            rules={[{ required: true, message: 'Please enter a value' }]}
          >
            <Input style={{borderColor:"#6c2f4a",borderWidth:'1px'}} />
          </Form.Item>
          </Col>
          <Col span={8}>
          <Form.Item
            name={[`playbook_parameter_${i}`]}
            label={`Parameter ${i + 1}`}
            rules={[{ required: true, message: 'Please enter a value' }]}
          >
            <Input style={{borderColor:"#6c2f4a",borderWidth:'1px'}} />
          </Form.Item>
          </Col>
          <Col span={8}>
          <Form.Item
            name={[`playbook_parameter_label_${i}`]}
            label={`Label ${i + 1}`}
            rules={[{ required: true, message: 'Please enter a value' }]}>
            <Input style={{borderColor:"#6c2f4a",borderWidth:'1px'}} />
          </Form.Item>
          </Col>
          </Row>
        </div>
      );
    }
    return fields;
  };
  const showSuccessNotification = () => {
    notification.success({
      message: 'Playbook Saved',
      description: 'Your playbook has been saved successfully!',
      duration: 3, 
      placement:'top'
    });
  };
  const showErrorNotification = () => {
    notification.error({
      message: 'Error',
      description: 'An error occurred while saving the playbook. Please try again.',
      duration: 3, 
      placement: 'top',
    });
  };

  const  onFinish=async (values)=>{
  const {
  playbook_display_name,
  playbook_name,
  playbook_class_name,
  playbook_path,
  playbook_inputs,
  playbook_vault_password_path,
  playbook_module_path,
  type_of_playbook,
    } = values;
  console.log(type_of_playbook)
    const ParameterArray = [];
    const LabelArray=[];
    const PlaceholderArray=[];
    for (let i = 0; i < playbook_inputs; i++) {
      const Placeholder = values[`playbook_placeholder_${i}`];
      PlaceholderArray.push(Placeholder);
    }
    for (let i = 0; i < playbook_inputs; i++) {
      const parameter = values[`playbook_parameter_${i}`];
      ParameterArray.push(parameter);
    }
    for (let i = 0; i < playbook_inputs; i++) {
      const label = values[`playbook_parameter_label_${i}`];
      LabelArray.push(label);
    }
  
  const uniqueId =await  generateUniqueIdentifier(type_of_playbook);
  console.log(uniqueId);

  const apiData={
  id: uniqueId,
  playbook_name:playbook_name,
  playbook_class_name: playbook_class_name,
  playbook_display_name:playbook_display_name,
  playbook_path: playbook_path,
  playbook_inputs:playbook_inputs,
  playbook_parameters: ParameterArray,
  playbook_vault_password_path: playbook_vault_password_path,
  playbook_module_path: playbook_module_path,
  playbook_placeholders: PlaceholderArray,
  playbook_labels: LabelArray,
   }
   console.log(apiData)
   if (type_of_playbook=== 'windows') {
    axios.post('/windowsPlaybooks/new', apiData)
      .then((response) => {
        console.log(response.data);
        if (response.status === 201) {
          showSuccessNotification();
          form.resetFields();
        }
      })
      .catch((error) => {
        console.log(error)
        showErrorNotification();
      });
  }
  else if (type_of_playbook==='linux'){
    axios.post('/linuxPlaybooks/new', apiData)
      .then((response) => {
        console.log(response.data);
        if (response.status === 201) {
          showSuccessNotification()
          form.resetFields();
        }
      })
      .catch((error) => {
        console.log(error)
        showErrorNotification();
      });
  }
  else if (type_of_playbook==='Others'){
    axios.post('/otherPlaybooks/new', apiData)
      .then((response) => {
        console.log(response.data);
        if (response.status === 201) {
          showSuccessNotification();
          form.resetFields();
        }
      })
      .catch((error) => {
        console.log(error)
        showErrorNotification();
      });
  }
    
  }
  return (
    <>
    <ResponsiveAppBar/>
    <div className='main-container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' ,background:'#fff'}}>
    <div className='second-container'style={{ textAlign: 'center',  width: '750px', height: '1000px', padding: '20px' }}>
    <Title level={1}>Create Custom Playbook</Title>
    <Form
  //  {...layout}
    form={form}
    onFinish={onFinish}
    style={{ height: '100%' }}>
    <Form.Item
      name={['playbook_name']}
      label="Playbook Name"
      rules={[
        {
          required: true,
        },
      ]}
    >
    <Input style={{borderColor:"#6c2f4a",borderWidth:'1px'}}/>
    </Form.Item>
    <Form.Item 
      name={[ 'playbook_class_name']}
      label="Playbook Class Name"
      rules={[
        {
          required: true,
        },
      ]}
    >
    <Input style={{borderColor:"#6c2f4a",borderWidth:'1px'}} />
    </Form.Item>
    <Form.Item
      name={['playbook_display_name']}
      label="Playbook Display Name"
      rules={[
        {
          required: true,
        },
      ]}
    >
    <Input style={{borderColor:"#6c2f4a",borderWidth:'1px'}}/>
    </Form.Item>
    <Form.Item  className="custom-form-item" label="Type of Playbook"
     name="type_of_playbook"
     rules={[{ required: true, message: 'Please select a result' }]}>
        <Select style={{ border: '1px solid  #6c2f4a', borderRadius: '8px' }}>
          <Select.Option value="linux">Linux Playbook</Select.Option>
          <Select.Option value="windows">Window Playbook</Select.Option>
          <Select.Option value="Others">Other Playbook</Select.Option>
        </Select>

      </Form.Item>
   
    <Form.Item style={{ textAlign: 'right' }}
      name={['playbook_inputs']}
      label="Playbook Inputs"
      rules={[
        { 
          required:true,
          type: 'number',
          min: 0,
          max: 10,
        },
      ]}
    >
    <InputNumber style={{borderColor:"#6c2f4a",borderWidth:'1px'}} min={0} onChange={handleInputChange} />
    </Form.Item>
    {numFields > 0 && renderFields(numFields)}
    <Form.Item
      name={['playbook_vault_password_path']}
      label="Playbook Vault Password path"
    >
    <Input style={{borderColor:"#6c2f4a",borderWidth:'1px'}} />
    </Form.Item>
    <Form.Item
      name={['playbook_module_path']}
      label="Playbook Module path"
    >
    <Input style={{borderColor:"#6c2f4a",borderWidth:'1px'}} />
    </Form.Item>
    <Form.Item
      name={['playbook_path']}
      label="Playbook path"
      rules={[
        { 
          required:true
        },
      ]}
    >
    <Input style={{borderColor:"#6c2f4a",borderWidth:'1px'}} />
    </Form.Item>
    <Form.Item>
      <Button type="primary"  style={{ width: '100%', backgroundColor: '#6c2f4a'}} htmlType="submit">
        Save Playbook
      </Button>
    </Form.Item>
  </Form>
    </div>
    </div>
    </>
  )
}

export default CreateCustomPlaybook;
