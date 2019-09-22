const defaultState = {
    value:"redux"
}  //默认数据
export default (state = defaultState,action)=>{  //就是一个方法函数
    if(action.type === "changeState"){

        let newState = JSON.parse(JSON.stringify(state));
        newState.value = action.value;
        return newState;
    }
    return state;
}