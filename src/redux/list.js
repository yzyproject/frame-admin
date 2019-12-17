import React from 'react';
// import { Router, Route, Link } from 'react-router-dom';
import 'antd/dist/antd.css'
import { Form, Icon, Input, Button, Checkbox,Layout, Menu, Breadcrumb,TreeSelect } from 'antd';
import Config from '../config';
import Fetch from '../common/fetch'; 
import Islogin from '../common/islogin'; 
import {change_state,trank_action} from "./create_action";
import {connect} from 'react-redux'  //引入连接器
let lg = new Islogin();
const  List = (props)=>{
    let {onChange,value,onClick} = props;
    return (
        <span className = "form_box" style = {{marginTop:"100px",display:"block",padding:"0 20px"}}>
            <Input onChange={onChange}/>{
                typeof(value) === "object"?<div>{(value||[]).map(v=>{
                    return <div key={v.id}>{v.id}</div>
                })}</div>:<div>{value}</div>
            }
            <div onClick = {onClick} >button</div>
        </span>
    )
}
const stateToProps = (state)=>{
    return {
        value:state.value
    }
}
const dispathChange = (dispath)=>{
    return {
        onChange(e){
           let action = {
               type:"changeState",
               value:e.target.value
           }
           dispath(action);
        },
        onClick(){
            // const action = trank_action();
           const action = async (dispatch)=>{
                let data = {
                    options:"id,is_sub, parent_id,title,menu_url,icon,default_selected_keys,default_open_keys",
                    orderBy:"",
                    startPops:"",
                    limit:""
                }
                let f = new Fetch();
                let res = await f.fetch(Config.host+'/index/getMenu',data);
                const action = change_state(res.menuObj.menu);
                console.log("res:",res)
                dispatch(action);
            }
            dispath(action);
        }
    }
}
export default connect(stateToProps,dispathChange)(List);
