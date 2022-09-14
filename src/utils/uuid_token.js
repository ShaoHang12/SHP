import { v4 as uuidv4 } from 'uuid';
export const getUUID = () =>{
    //检查本地存储
   let  uuid_token = localStorage.getItem('UUIDTOKEN');
    //如果没有生成临时游客身份
    if (!uuid_token) {
        uuid_token = uuidv4();
        //本地存储存储一次
        localStorage.setItem('UUIDTOKEN', uuid_token);
    }
    return  uuid_token;

}