import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import 'antd/dist/antd.css'
import { Form, Icon, Input, Button, Checkbox,Layout, Menu, Breadcrumb,TreeSelect } from 'antd';
import Config from '../config';
import Fetch from '../common/fetch'; 
import Islogin from '../common/islogin'; 
let lg = new Islogin();
const FormItem = Form.Item;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { SHOW_PARENT } = TreeSelect;
const treeData = [
    {
      title: 'Node1',
      value: '0-0',
      key: '0-0',
      children: [
        {
          title: 'Child Node1',
          value: '0-0-0',
          key: '0-0-0',
        },
      ],
    },
    {
      title: 'Node2',
      value: '0-1',
      key: '0-1',
      children: [
        {
          title: 'Child Node3',
          value: '0-1-0',
          key: '0-1-0',
        },
        {
          title: 'Child Node4',
          value: '0-1-1',
          key: '0-1-1',
        },
        {
          title: 'Child Node5',
          value: '0-1-2',
          key: '0-1-2',
        },
      ],
    },
  ];
class Index extends React.Component{
    constructor(obj){
        super(obj)
        lg.isLogin();
        this.Init()
    }
    state = {
        value: ['0-0-0'],
      };
    
      onChange = value => {
        console.log('onChange ', value);
        this.setState({ value });
      };
    async Init(values){
        let data = {
            options:"id,sub_id, parent_id,title,menu_url,icon,default_selected_keys,default_open_keys",
            orderBy:"",
            startPops:"",
            limit:""
        }
        let f = new Fetch();
        let res = await f.fetch(Config.host+'/index/getMenu',data)
        if(res.status === "success" && res.code === 200){
            console.log("====success====")
        }
    }
    render(){
        const tProps = {
            treeData,
            value: this.state.value,
            onChange: this.onChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: 'Please select',
            style: {
              width: 300,
            },
          };
        
        return (
          <span className = "form_box" style = {{marginTop:"100px",display:"block",padding:"0 20px"}}>
                
          <Layout>
              <Header className="header">
              <div className="logo" />
              <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={['2']}
                  style={{ lineHeight: '64px' }}
              >
                  <Menu.Item key="1">nav 1</Menu.Item>
                  <Menu.Item key="2">nav 2</Menu.Item>
                  <Menu.Item key="3">nav 3</Menu.Item>
              </Menu>
              </Header>
              <Layout>
              <Sider width={200} style={{ background: '#fff' }}>
                  <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%', borderRight: 0 }}
                  >
                  <SubMenu
                      key="sub1"
                      title={
                      <span>
                          <Icon type="user" />
                          subnav 1
                      </span>
                      }
                  >
                      <Menu.Item key="1">option1</Menu.Item>
                      <Menu.Item key="2">option2</Menu.Item>
                      <Menu.Item key="3">option3</Menu.Item>
                      <Menu.Item key="4">option4</Menu.Item>
                  </SubMenu>
                  <SubMenu
                      key="sub2"
                      title={
                      <span>
                          <Icon type="laptop" />
                          subnav 2
                      </span>
                      }
                  >
                      <Menu.Item key="5">option5</Menu.Item>
                      <Menu.Item key="6">option6</Menu.Item>
                      <Menu.Item key="7">option7</Menu.Item>
                      <Menu.Item key="8">option8</Menu.Item>
                  </SubMenu>
                  <SubMenu
                      key="sub3"
                      title={
                      <span>
                          <Icon type="notification" />
                          subnav 3
                      </span>
                      }
                  >
                      <Menu.Item key="9">option9</Menu.Item>
                      <Menu.Item key="10">option10</Menu.Item>
                      <Menu.Item key="11">option11</Menu.Item>
                      <Menu.Item key="12">option12</Menu.Item>
                  </SubMenu>
                  </Menu>
              </Sider>
              <Layout style={{ padding: '0 24px 24px' }}>
                  <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>List</Breadcrumb.Item>
                  <Breadcrumb.Item>App</Breadcrumb.Item>
                  </Breadcrumb>
                  <Content
                  style={{
                      background: '#fff',
                      padding: 24,
                      margin: 0,
                      minHeight: 280,
                  }}
                  >
                  Page1
                  </Content>
              </Layout>
              </Layout>
          </Layout>,
          mountNode,
      </span>
        )
    }
}
export default Index;
