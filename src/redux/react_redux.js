import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css'
import { Form, Icon, Input, Button, Checkbox,Layout, Menu, Breadcrumb,TreeSelect } from 'antd';
import Config from '../config';
import Fetch from '../common/fetch'; 
import Islogin from '../common/islogin'; 
import store from "./index";
import {change_state,trank_action} from "./create_action";
import List from "./list";
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
        // this.Init();
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
        <Provider store = {store}>
            <List/>
        </Provider>
        )
    }
}
export default ReduxPage;
