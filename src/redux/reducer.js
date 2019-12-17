const defaultState = {
    datas:[]
}  //默认数据
export default (state = defaultState,action)=>{  //就是一个方法函数
    if(action.type === "changeState"){
        let newState = JSON.parse(JSON.stringify(state));
        newState.datas = action.value;
        return newState;
    }
    if(action.type === "addItem"){
        let newState = JSON.parse(JSON.stringify(state));
        newState.datas.push({
            id:action.value+ newState.datas [newState.datas.length-1].id + 1
        })
        return newState;
    }
    if(action.type === "deleteItem"){
        let newState = JSON.parse(JSON.stringify(state));
        newState.datas.splice(action.index,1)
        return newState;
    }
    return state;
}