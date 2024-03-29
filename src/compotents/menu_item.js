import React from 'react';
import 'antd/dist/antd.css'
import Config from '../config';
import Fetch from '../common/fetch'; 
import Islogin from '../common/islogin'; 
import Base from '../common/base'; 
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
const { Option } = Select;
 class SetMenu extends React.Component{
    constructor(obj){
      super(obj)
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            let options = "";
            if(values.parent_id === "NULL"){
              delete values.parent_id;
              options="admin_id,is_sub,title,icon,default_selected_keys,default_open_keys"
            }else{
              options = "admin_id,is_sub,partent_id,title,icon,default_selected_keys,default_open_keys"
            }
            let data = {
              options:options,
              fieldValue:values
          }
          let f = new Fetch();
          let res =  f.fetch(Config.host+'/index/addMenu',data)
          if(res.status === "success" && res.code === 200){
            this.setState({
              menuData:res.menuObj
            })
          }
            console.log('Received values of form: ', values);
          }
        });
      };
      normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
      };
      render() {
        let { id } =  this.props;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
          labelCol: { span: 2 },
          wrapperCol: { span: 6 },
        };
        let admin_id = JSON.parse( localStorage.getItem("user")).id;
        return (
          <span>
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Form.Item label="is_sub">
                {getFieldDecorator('is_sub',{ initialValue: "true" })(<Switch defaultChecked  />)}
              </Form.Item>
              <Form.Item label="admin_id">
                {getFieldDecorator('admin_id', { initialValue: admin_id})(<Input disabled  />)}
              </Form.Item>
              <Form.Item label="parent_id">
                {getFieldDecorator('parent_id', { initialValue: id })(<Input disabled  />)}
              </Form.Item>
              <Form.Item label="title">
                {getFieldDecorator('title', { initialValue: "一级菜单" })(<Input  />)}
              </Form.Item>
              <Form.Item label="icon">
                {getFieldDecorator('icon', { initialValue: "user" })(<Input />)}
              </Form.Item>
              <Form.Item label="default_selected_keys">
                {getFieldDecorator('default_selected_keys', { initialValue: false })(<Switch />)}
              </Form.Item>
              <Form.Item label="default_open_keys">
                {getFieldDecorator('default_open_keys', { initialValue: false })(<Switch />)}
              </Form.Item>
              <Form.Item wrapperCol={{ span: 1, offset: 1 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </span>
        );
      }
}
export default Form.create({ name: 'set_menu' })(SetMenu);
