import {  notification } from "antd";

export const  notificationFunction=(type,description='', message)=>{
    return notification[type]({
        message: message,
        description:description
    })
}