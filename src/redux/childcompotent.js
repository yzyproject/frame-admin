import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import 'antd/dist/antd.css'
import { Form, Icon, Input, Button, Checkbox,Layout, Menu, Breadcrumb,TreeSelect } from 'antd';
import Config from '../config';
import Fetch from '../common/fetch'; 
import Islogin from '../common/islogin'; 
import store from "./index";
import {change_state,trank_action} from "./create_action";
import {connect} from 'react-redux'  //引入连接器
const Child = (props)=>{
    let {onChange,value,onClick} = props;
    console.log("=====childData0000aaaaa:",store.getState().datas);
    return (
        <span>子组件</span>
    )
}
export default Child;
