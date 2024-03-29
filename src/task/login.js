import React from 'react';
import 'antd/dist/antd.css'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import Config from '../config';
import Fetch from '../common/fetch'; 
import Islogin from '../common/islogin'; 
let lg = new Islogin();
const FormItem = Form.Item;
class Login extends React.Component{
    constructor(obj){
        super(obj)
        lg.isLogin("page_login");
    }
    async handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.Init(values)
          }
        });
    }
    async Init(values){
        let user = values || {};
        if(user.userName && user.password){
            let data = {
                options:"id,name",
                orderBy:"id desc,creat_at desc",
                startPops:0,
                limit:10
            }
            data = Object.assign(user,this.state,data);
            data.filter = {
                name:{value:user.userName,fl:"rt%"},
                password:{value:user.password}
            }
            let f = new Fetch();
            let res = await f.fetch(Config.host+'/login/login',data)
            if(res.status === "success" && res.code === 200){
                localStorage.tionkfeon = JSON.stringify(res.token);
                localStorage.user = JSON.stringify(res.array[0]||[]);
                lg = new Islogin();
                lg.isLogin("page_login");
            }
        }
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 8 },
        };
        const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 12,
                offset: 0,
              },
              sm: {
                span: 8,
                offset: 8,
              },
            },
          };
        return (
            <span className = "form_box" style = {{marginTop:"100px",display:"block",padding:"0 20px"}}>
                
                <Form  onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem
                     
                        style = {{textAlign:"center"}}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                           登录
                        </Button>
                        
                    </FormItem>
                </Form>
            </span>
        )
    }
}
export default Form.create()(Login);
