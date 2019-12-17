import Fetch from '../common/fetch'; 
import Config from '../config';
import {changeState,addItem,deleteItem} from "./action_types";
export const change_state = (data)=>{
    return {
        type:changeState,
        value:data
    }
}
export const trank_action = (data)=>{
   
    return  async (dispatch)=>{
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
}
//添加项
export const add_item = (data)=>{
    return {
        type:addItem,
        value:data
    }
}
//删除
export const delete_item = (data)=>{
    return {
        type:deleteItem,
        index:data
    }
}
// export {change_state,trank_action};