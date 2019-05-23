import React from 'react';
import {Checkbox,Button} from 'element-react'
import {Check}  from '@/request/api.js'
import Md5 from 'js-md5'
import './login.scss'
class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            userName:'',
            psd:'',
            nameErr:'',
            passwordErr:'',
            loginState:true
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.checkedChange = this.checkedChange.bind(this)
        this.login = this.login.bind(this)
    }
    /**
     * 输入改变时
     */
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value
        })
    }
    checkedChange(value){
        console.log(value)
        this.setState({
            loginState:value
        })
    }
    /**
     * 登录
     */
    login(){
        let _this = this.state
        if(_this.userName === ''){
            console.log(12)
            this.setState({
                nameErr:'请输入用户名'
            })
        }
        if(_this.password === ''){
            this.setState({
                passwordErr:'请输入密码'
            })
        }
        if(_this.userName !== ''&&_this.password !== ''){
            Check({
                FAction:'Login',
                FUserName:_this.userName,
                FPassword:Md5(_this.psd),
                TerminalType:'PC'
            })
            .then((data) => {
                console.log(data);
                sessionStorage.setItem('FToken',data.FObject.FToken)
                sessionStorage.setItem('project',JSON.stringify(data.FObject.Project))
                if(_this.loginState){
                    localStorage.setItem('userName',_this.userName)
                    localStorage.setItem('password',_this.password)
                }
                this.props.history.push('')
            }).catch((err) => {
                if(err.Result === 103){
                    this.setState({
                        passwordErr:'用户名或密码错误'
                    })
                    this.passwordErr = '用户名或密码错误'
                }else{
                    this.setState({
                        passwordErr:'未知错误，请联系管理员'
                    })
                }
            });
        }
    }
    componentDidMount(){
        document.onkeydown = e =>
         {
          let event = window.event||e
          let _key = event.keyCode;
          if (_key === 13) {
              this.login()
          }
        };
        this.setState({
            userName:localStorage.getItem('userName'),
            psd:localStorage.getItem('password')
        })
    }
    render(){
        let _this = this.state
        return(
            <div className ='login'>
                <div className ='login-box'>
                    <h2>欢迎登录</h2>
                    <ul>
                        <li className='login-item'>
                            <i className='iconfont icon-mine'></i>
                            <input name='userName'  type='text' value={_this.userName} onChange ={this.handleInputChange}/>
                        </li>
                        <li className='err-message'>{_this.nameErr}</li>
                        <li className='login-item'>
                            <i className='iconfont icon-Lock'></i>
                            <input name='psd' type = 'password' value={_this.psd} onChange ={this.handleInputChange} />
                        </li>
                        <li className='err-message'>{_this.passwordErr}</li>
                        <li className='login-item'>
                            <Checkbox checked ={_this.loginState} value = {_this.loginState} onChange={this.checkedChange}>记住用户名和密码</Checkbox>
                        </li>
                        <li className='login-item'><Button onClick={this.login}>登　录</Button></li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default Login