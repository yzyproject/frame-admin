import React from 'react';
import 'antd/dist/antd.css'
import Config from '../config';
import Fetch from '../common/fetch'; 
import Islogin from '../common/islogin'; 

import {
    Form,
    Select,
    InputNumber,
    Switch,
    Radio,
    Slider,
    Button,
    Upload,
    Icon,
    Rate,
    Checkbox,
    Input,
    Row,
    Col,
    Table
} from 'antd';
import MenuItem from '../compotents/menu_item';
const { Option } = Select;
class SetMenu extends React.Component{ 
      render() {
        let datas = this.props.location.state;
        let {id} = datas;
        console.log("====id:",id)
        const columns = [
          {
            title: 'Name',
            dataIndex: 'name',
            render: text =><Input/>,
          },
          {
            title: 'Age',
            dataIndex: 'age',
          },
          {
            title: 'Address',
            dataIndex: 'address',
          },
        ];
        const data = [
          {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
           
          },
          {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
          },
          {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
          },
          {
            key: '4',
            name: 'Disabled User',
            age: 99,
            address: 'Sidney No. 1 Lake Park',
          },
        ];
        const rowSelection = {
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          },
          getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
          }),
        };
        return (
          <span>
            <div className="menu_item">
              <MenuItem id={id} />  
            </div>
          </span>
        );
      }
}
export default Form.create({ name: 'set_menu' })(SetMenu);
