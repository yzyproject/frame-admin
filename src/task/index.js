import React from 'react';
import 'antd/dist/antd.css'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import Config from '../config';
import Fetch from '../common/fetch'; 
import Islogin from '../common/islogin'; 
let lg = new Islogin();
const FormItem = Form.Item;
class Index extends React.Component{
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
                
                首页
            </span>
        )
    }
}
export default Index;
