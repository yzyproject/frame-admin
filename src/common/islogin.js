export default class IsLogin {
    constructor(){
        this.tionkfeon = localStorage.getItem("tionkfeon") || "";
    }
    isLogin(page_type){
        if(this.tionkfeon){//直接登录
            if(page_type == "page_login"){
                window.location.href = "http://localhost:3000/index"
            }
            return;
        }else{ //跳转到登录页
            if(page_type !== "page_login"){
                window.location.href = "http://localhost:3000"
            }
            return;
        }
    }
 }