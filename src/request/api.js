/**   
 * api接口统一管理
 * Login 登录
 * 详情请看接口文档
 */
import {post } from './http';
const Check = p => post('Check', p);
const HomePage = p => post('HomePage',p)
const Project = p => post('Project',p)
const Alarm = p => post('Alarm',p)
const Building = p => post('Building',p)
const System = p => post('System', p)
export{
    Check,
    HomePage,
    Project,
    Alarm,
    Building,
    System
}