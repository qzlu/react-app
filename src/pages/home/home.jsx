import React from 'react';
import {Dropdown,Button} from 'element-react'
import { Route ,Link} from "react-router-dom";
import './index.scss'
import Index from './index.jsx'
import IndexItem from './indexItem.jsx'
import Detaile from './deviceDetaile.jsx'
export default class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
        this.logOut = this.logOut.bind(this)
        this.dropdownItemClick = this.dropdownItemClick.bind(this)
    }
    dropdownItemClick(val){
        if(val === '1'){
            console.log(1)
        }else if(val === '2'){
            this.logOut()
        }
    }
    logOut(){
        this.props.history.push('/Login')
    }
    changeRouter(){
        this.props.history.push('/indexItem')
    }
    componentWillMount(){
    }
    componentDidMount(){
        console.log(this.props.history.location.pathname)
    }
    componentWillReceiveProps(){
    }
    shouldComponentUpdate(){
      console.log('更新了')
      console.log(this.props.location.pathname)
      return true
    }
    render(){
        let name
        if(this.props.history.location.pathname === '/'){
            name = '中物互联'
        }else{
            name = sessionStorage.getItem('projectName')
        }
        return (
            <div className='home cloud'>
                    <div className="header">
                        {
                            this.props.location.pathname.match(/\/detaile/)&&
                            <Button  className="back">
                                <Link to="/indexItem">
                                    <i className="icon el-icon-arrow-left"></i>返回
                                </Link>
                            </Button>
                        }
                        <span className="title">{name}数字消防云平台</span>
                        <ul className="clearfix">
                            {
                                this.props.location.pathname !== '/'&&
                                <li  className="l icon">
                                    <Link to='/'>
                                        <i className="iconfont icon-ZS-bloc"></i>
                                    </Link>
                                </li>
                            }
                            {
                                this.props.location.pathname !== '/'&&
                                <li  className="l icon">
                                    <Link to='/indexItem'>
                                        <i className="iconfont icon-zs-backstage"></i>
                                    </Link>
                                </li>
                            }
                            <li className='l icon'>
                            <Dropdown menu={(
                                <Dropdown.Menu>
                                   <Dropdown.Item command = '1'>设置密码</Dropdown.Item>
                                   <Dropdown.Item command = '2'>退出登录</Dropdown.Item>
                                 </Dropdown.Menu>
                                 )}
                                 onCommand = {this.dropdownItemClick}
                                >
                                <i className="iconfont icon-User"></i>
                            </Dropdown>
                            </li>
                            <li className="l user-name">张三</li>
                        </ul>
                    </div>
                    <Route exact= {true} path='/'  component={Index}></Route>
                    <Route path='/indexItem' component ={IndexItem}></Route>
                    <Route path='/detaile/:id' component={Detaile}></Route>
            </div>
        )
    } 
}