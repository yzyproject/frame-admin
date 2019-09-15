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
    constructor(props){
      super(props)
      let datas = this.props.location.state;
      let { id,is_sub }= datas;
      this.state= {
          id:datas.id,
          data:{}
      }
    }
    componentDidMount(){
        this.Init(this.state.id);
    };

    async Init(id){
        let data = {
            options:"id,admin_id,is_sub, parent_id,title,menu_url,icon,default_selected_keys,default_open_keys",
            filter:{id:id},
            orderBy:"",
            startPops:"",
            limit:""
        }
        let f = new Fetch();
        let res = await f.fetch(Config.host+'/index/getCurryMenu',data)
        if(res.status === "success" && res.code === 200){
          this.setState({
            data:res.data
          })
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
           
            let data = {
              fieldValue:values,
              whereOption:{
                  id:this.state.id
              }
          }
          let f = new Fetch();
          let res =  f.fetch(Config.host+'/index/udateOne',data)
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
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
          labelCol: { span: 2 },
          wrapperCol: { span: 6 },
        };
        let admin_id = JSON.parse( localStorage.getItem("user")).id;
        let datas = this.props.location.state;
        let { id,is_sub }= datas;
        return (
          <span>
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Form.Item label="is_sub">
                {getFieldDecorator('is_sub',{ initialValue: "" })(<Switch defaultChecked ={ is_sub }  />)}
              </Form.Item>
              <Form.Item label="admin_id">
                {getFieldDecorator('admin_id', { initialValue: this.state.data.admin_id||""})(<Input disabled  />)}
              </Form.Item>
              <Form.Item label="parent_id">
                {getFieldDecorator('parent_id', { initialValue:this.state.data.parent_id||""})(<Input disabled  />)}
              </Form.Item>
              <Form.Item label="title">
                {getFieldDecorator('title', { initialValue: this.state.data.title||"" })(<Input  />)}
              </Form.Item>
              <Form.Item label="icon">
                {getFieldDecorator('icon', { initialValue: this.state.data.icon||"" })(<Input />)}
              </Form.Item>
              <Form.Item label="default_selected_keys">
                {getFieldDecorator('default_selected_keys', { initialValue: this.state.data.default_selected_keys||false })(<Switch />)}
              </Form.Item>
              <Form.Item label="default_open_keys">
                {getFieldDecorator('default_open_keys', { initialValue: this.state.data.default_open_keys||false })(<Switch />)}
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
