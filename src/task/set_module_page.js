import React from 'react';
import 'antd/dist/antd.css'
import Config from '../config';
import Fetch from '../common/fetch'; 
import Islogin from '../common/islogin'; 
import Base from '../common/base'; 
import {
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
let f = new Fetch();
const MenuData = require('../data/menu_data'); 

const admin_id = (JSON.parse( (localStorage.getItem("user")))||{}).id||"";
 class SetModulePage extends React.Component{
    constructor(obj){
      super(obj)
      this.state = {
          data:[]
      }
    }
    handleSubmit = () => {
        let datas = this.props.location.state;
        let {id} = datas;
        let  menuArr = this.state.data ;
        menuArr.map(d=>{
            d.admin_id = admin_id;
            d.parent_id = id;
        })
       
        // let options = "admin_id,parent_id,title,menu_url,icon"
        let data = {
            fieldValue:menuArr
        }
        let res =  f.fetch(Config.host+'/index/addMenuMany',data);
        if(res.status === "success" && res.code === 200){
            console.log("===============success================")
        
        }
      };
      normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
      };
      render() {
       
        const columns = [
          {
            title: 'title',
            dataIndex: 'title',
          },
          {
            title: 'menu_url',
            dataIndex: 'menu_url',
          },
          {
            title: 'icon',
            dataIndex: 'icon',
          },
        ];
        const rowSelection = {
          onChange: (selectedRowKeys, selectedRows) => {
              this.setState({
                  data:selectedRows
              })
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          },
          getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
          }),
        };
      
        return (
          <span>
            <Table rowKey = {MenuData.title}  rowSelection={rowSelection} columns={columns} dataSource={MenuData} />
            <div onClick = {this.handleSubmit}>添加应用菜单</div>
          </span>
        );
      }
}
export default SetModulePage;
