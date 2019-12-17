import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import 'antd/dist/antd.css'
import { Form, Icon, Input, Button, Checkbox,Layout, Menu, Breadcrumb,TreeSelect } from 'antd';
import Config from '../config';
import Fetch from '../common/fetch'; 
import Islogin from '../common/islogin'; 
import store from "./index";
import Child from "./childcompotent";
import {change_state,trank_action,add_item,delete_item} from "./create_action";
let lg = new Islogin();
const FormItem = Form.Item;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { SHOW_PARENT } = TreeSelect;
class ReduxPage extends React.Component{
    constructor(obj){
        super(obj)
        lg.isLogin();
        this.onChange= this.onChange.bind(this);
        this.setStates = this.setStates.bind(this);
        store.subscribe(this.setStates);
        // this.Init = this.Init.bind(this);
        // store.subscribe(this.Init);
        this.Init();
    }
    state = {
      value:"",
      inputvalue:""
    };
    Init(){
      const action = trank_action();
      store.dispatch(action);
    }
    onChange = (e)=> {
      const { value } = e.target;
      // let action = {
      //   type:"changeState",
      //   value:value
      // }
      // const action = trank_action(value);
      // store.dispatch(action);
      this.setState({
        inputvalue:value
      })
    };
    add(){
      let value = this.state.inputvalue;
      let action = add_item(value);
      store.dispatch(action);
    }
    deleteItem(i){
      let action = delete_item(i)
      store.dispatch(action);
    }
    setStates(){
      this.setState({
        datas:store.getState().datas
      })
    }
    render(){
        return (
        <span className = "form_box" style = {{marginTop:"100px",display:"block",padding:"0 20px"}}>
          <Child/>
          <Input onChange={this.onChange}/>
          <Button onClick = {()=>{this.add()}}>添加</Button>
          <div>{(this.state.datas||[]).map((v,i)=>{
            return <div onClick={()=>{this.deleteItem(i)}} key = {v.id}>{v.id}</div>
          })}</div>
        </span>
        )
    }
}
export default ReduxPage;
