import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import 'antd/dist/antd.css'
import { Form, Icon, Input, Button, Checkbox,Layout, Menu, Breadcrumb,TreeSelect } from 'antd';
import Config from '../config';
import Fetch from '../common/fetch'; 
import Islogin from '../common/islogin'; 
import store from "./index";
import {change_state,trank_action} from "./create_action";
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
      value:""
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
      const action = trank_action(value);
      store.dispatch(action);
    };
    setStates(){
      this.setState({
        value:store.getState().value
      })
    }
    render(){
        return (
        <span className = "form_box" style = {{marginTop:"100px",display:"block",padding:"0 20px"}}>
          <Input onChange={this.onChange}/>
          <div>{(this.state.value||[]).map(v=>{
            return <div key = {v.id}>{v.id}</div>
          })}</div>
        </span>
        )
    }
}
export default ReduxPage;
