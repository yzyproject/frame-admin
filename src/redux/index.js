import { createStore,applyMiddleware  } from 'redux'  // 引入createStore方法
import thunk from 'redux-thunk'
import reducer from "./reducer.js"
const store = createStore(
    reducer,
    applyMiddleware(thunk)
);         // 创建数据存储仓库
export default store                 //暴露出去