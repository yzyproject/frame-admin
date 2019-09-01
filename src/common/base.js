// require("isomorphic-fetch");
// const fs = require('fs');
// const join = require('path').join;
// /**
//  * 请求数据类
//  */
// export default class Base{
//     async findFile(startPath){
//         let result=[];
//         function finder(path) {
//             let files=fs.readdirSync(path);
//             files = files.filter(f =>{
//                 if(!f.startsWith("_") && !f.startsWith(".")){
//                     return f
//                 }
//             });
//             files.forEach((val,index) => {
//                 let fPath=join(path,val);
//                 let stats=fs.statSync(fPath);
//                 if(stats.isDirectory()) finder(fPath);
//                 if(stats.isFile()){
//                     if(fPath.indexOf("\\")>-1){
//                         fPath = fPath.replace(/\\/g,"/")
//                     }
//                     result.push(fPath)
//                 };
//             });
//         }
//         finder(startPath);
//         return result;
//     }
// }