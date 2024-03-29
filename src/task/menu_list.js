import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import 'antd/dist/antd.css'
import '../css/menu_list.css';
import { Form, Icon, Input, Button, Checkbox,Layout, Menu, Breadcrumb,TreeSelect,message } from 'antd';
import Config from '../config';
import Fetch from '../common/fetch'; 
import Islogin from '../common/islogin'; 
const FormItem = Form.Item;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { SHOW_PARENT } = TreeSelect;
class Index extends React.Component{
  constructor(obj){
    super(obj)
    this.Init()
}
    state = {
      menuData:{},
    };
    async Init(values){
        let data = {
            options:"id,is_sub, parent_id,title,menu_url,icon,default_selected_keys,default_open_keys",
            filter:{admin_id:{value:1,fl:"1between2"}},
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
    async delete(id){
      let data = {
       id:id
      }
      let f = new Fetch();
      let res = await f.fetch(Config.host+'/index/deleteMenu',data)
      if(res.status === "success" && res.code === 200){
        message.info("删除成功！");
        window.location.reload();
      }
    }
    setMenu(menuItem){
      if(menuItem.is_sub){
        return (
          <SubMenu
          key = {menuItem.id}
          title={
            <span className="menu_item_box">
                <span>{menuItem.id }</span>
                <span>{menuItem.is_sub}</span>
                <span>{menuItem.partent_id }</span>
                <span>{menuItem.title }</span>
                <span>{menuItem.menu_url }</span>
                <span className="add_menu_item " ref = {menuItem.id} onClick={()=>{this.delete(menuItem.id)}}> 删除</span>
                <span className="add_menu_item "><Link to={{ pathname:'/edit_menu',state:{id:menuItem.id,is_sub:true }}}>编辑</Link></span>
                <span className="add_menu_item "><Link to={{ pathname:'/set_module_page',state:{id:menuItem.id,is_sub:true }}}>添加应用</Link></span>
                <span className="add_menu_item "><Link to={{ pathname:'/set_menu',state:{id:menuItem.id,is_sub:true }}}>添加菜单</Link></span>
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
          <Menu.Item key = {menuItem.id}>
            <span className="menu_item_box">
                <span>{menuItem.id }</span>
                <span>{menuItem.is_sub}</span>
                <span>{menuItem.partent_id }</span>
                <span>{menuItem.title }</span>
                <span>{menuItem.menu_url }</span>
                <span className="add_menu_item "onClick={()=>{this.delete(menuItem.id)}}>删除</span>
                <span className="add_menu_item "><Link to={{ pathname:'/edit_menu',state:{id:menuItem.id,is_sub:false }}}>编辑</Link></span>
            </span>
          </Menu.Item>
        )
      }
    }
    render(){
        return (
          <span className = "form_box" style = {{marginTop:"100px",display:"block",padding:"0 20px"}}>
            <Link className="add_menu" to={{ pathname:'/set_menu',state:{id:"NULL" }}}>添加菜单</Link>
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
      </span>
        )
    }
}
export default Index;
