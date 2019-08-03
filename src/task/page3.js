import React from 'react';
import 'antd/dist/antd.css'
import { Form, Icon, Input, Button, Checkbox,Layout, Menu, Breadcrumb } from 'antd';
import Config from '../config';
import Fetch from '../common/fetch'; 
import Islogin from '../common/islogin'; 
let lg = new Islogin();
const FormItem = Form.Item;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
class Page3 extends React.Component{
    constructor(obj){
        super(obj)
        lg.isLogin();
        this.Init()
    }
    async Init(values){
        let data = {
            options:"menu_id,function_name,create_at",
            orderBy:"creat_at desc",
            startPops:0,
            limit:10
        }
        data.filter = {
           menu_id:1
        }
        let f = new Fetch();
        let res = await f.fetch(Config.host+'/index/getFunctions',data)
        if(res.status === "success" && res.code === 200){
            console.log("====success====")
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
                        Page3
                        </Content>
                    </Layout>
                    </Layout>
                </Layout>,
                mountNode,
            </span>
        )
    }
}
export default Page3;
