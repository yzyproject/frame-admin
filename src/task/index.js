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
class Index extends React.Component{
    constructor(obj){
        super(obj)
        lg.isLogin();
        this.Init()
    }
    state = {
      menuData:{},
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
          this.setState({
            menuData:res.menuObj
          })
        }
    }
    setMenu(menuItem){
      if(menuItem.sub_id){
        return (
          <SubMenu
          key = {menuItem.id}
          title={
            <span>
                <Icon type={menuItem.icon} />
                {menuItem.id}
            </span>
            }
          
          >
            {
             menuItem.child?menuItem.child.map(c=>{
              return this.setMenu(c)
             }):""
            }
          </SubMenu>
        )
      }else{
        return (
          <Menu.Item key = {menuItem.id}><Link to={menuItem.menu_url}>{menuItem.id}</Link></Menu.Item>
        )
      }
    }
    render(){
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
                    {
                      (this.state.menuData.menu||[]).map(m=>{
                        return this.setMenu(m)
                      })
                    }
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
