import React from 'react';
import 'antd/dist/antd.css'
import Config from '../config';
import Fetch from '../common/fetch'; 
import Islogin from '../common/islogin'; 
import Base from '../common/base'; 
import {
    Form,
    Select,
    InputNumber,
    Switch,
    Radio,
    Slider,
    Button,
    Upload,
    Icon,
    Rate,
    Checkbox,
    Input,
    Row,
    Col,
    Table,
    Modal
} from 'antd';
const { Option } = Select;
function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
}
 class UploadFile extends React.Component{
    constructor(props){
      super(props)
      let datas = this.props.location.state;
    }
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
          {
            uid: '-2',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
          {
            uid: '-3',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
          {
            uid: '-4',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
          {
            uid: '-5',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
        ],
      };
    
      handleCancel = () => this.setState({ previewVisible: false });
      handlePreview = async file => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
          previewImage: file.url || file.preview,
          previewVisible: true,
        });
      };
    
      handleChange = ({ fileList }) => this.setState({ fileList });
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
           
            let data = {
              fieldValue:values,
              whereOption:{
                  id:values.parent_id
              }
          }
          let f = new Fetch();
          let res =  f.fetch(Config.host+'/index/udateOne',data)
          if(res.status === "success" && res.code === 200){
            this.setState({
              menuData:res.menuObj
            })
          }
            console.log('Received values of form: ', values);
          }
        });
      };
      normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
      };
      render() {
        let tionkfeon = localStorage.getItem("tionkfeon");
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
          labelCol: { span: 2 },
          wrapperCol: { span: 6 },
        };
        let admin_id = JSON.parse( localStorage.getItem("user")).id;
        let datas = this.props.location.state;
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
        <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
        </div>
        );
    return (
            <div className="clearfix">
                <Upload
                    action= {`${Config.host}/index/UploadFile?tionkfeon=${tionkfeon}`} 
                    headers= {{'Authorization':tionkfeon ||""}}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}
export default Form.create({ name: 'set_menu' })(UploadFile);
