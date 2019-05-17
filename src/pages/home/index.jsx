import React from 'react';
import {Dropdown} from 'element-react'
import {Number,Table} from '../../components/index'
import Scrollbar from 'react-scrollbar'
import './index.scss'
const BMap = window.BMap
export default class Index extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            map:null,
            tableLabel:[
                {
                    label:'项目',
                    prop:'name',
                    width:'25%'
                },
                {
                    label:'告警时间',
                    prop:'time',
                    width:'25%'
                },
                {
                    label:'告警内容',
                    prop:'content',
                    width:'25%'
                },
                {
                    label:'当前值',
                    prop:'value',
                    width:'25%'
                }
            ],
            data:[
                {
                    name:'中物互联',
                    time:'10:00',
                    content:'过流',
                    value:'100A'
                },
                {
                    name:'中物互联',
                    time:'10:00',
                    content:'过流',
                    value:'100A'
                },
                {
                    name:'中物互联',
                    time:'10:00',
                    content:'过流',
                    value:'100A'
                },
                {
                    name:'中物互联',
                    time:'10:00',
                    content:'过流',
                    value:'100A'
                },
                {
                    name:'中物互联',
                    time:'10:00',
                    content:'过流',
                    value:'100A'
                },
                {
                    name:'中物互联',
                    time:'10:00',
                    content:'过流',
                    value:'100A'
                },
            ]
        }
        this.initMap = this.initMap.bind(this)
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
    /**
     * 初始化百度地图
     */
    async initMap(){
        let map = new BMap.Map('map')
        await this.setState({
            map:map
        })
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
        //添加地图类型控件
        map.setCurrentCity("深圳");          // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        map.setMapStyle({style:'midnight'});
    }
    componentWillMount(){
    }
    componentDidMount(){
      this.initMap()
    }
    componentWillReceiveProps(){
    }
    shouldComponentUpdate(){
      console.log('更新了')
      return true
    }
    render(){
        const leftList = [1,2,3,4].map((item,i) => {
            return(
                <li  key={i}>
                <h4>
                   <i className="iconfont icon-Lift"></i>
                   电气火灾系统
               </h4>
               <div className="list-content">
                   <div className="statu">
                   </div>
                   <ul className="param">
                        {
                            [1,2,3,4].map((obj,j) => {
                                return(
                                    <li key={j}>
                                        <i className="iconfont icon-FirePump"></i>
                                        线缆温度
                                        <span className="value">
                                           10 / 0
                                        </span>
                                    </li>
                                )
                            })
                        }
                   </ul>
               </div>
                </li>
            )
        })
        const leftList1 = [1,2,3].map((item,i) => {
            return(
                <li key={i}>
                    <h4>中物互联</h4>
                    <div className="list-content">
                       <div className="statu"></div>
                       <ul  className="param clearfix">
                           <li className="l">
                               <i className="iconfont icon-FireAlarm"></i>
                               <span className="value">0</span>
                           </li>
                           <li className="l" >
                               <i className="iconfont icon-Numberofwarning"></i>
                               <span className="value">0</span>
                           </li>
                           <li className="l">
                               <i className="iconfont icon-Numberofwarning"></i>
                               <span className="value">0</span>
                           </li>
                           <li className="l">
                               <i className="iconfont icon-Numberofwarning"></i>
                               <span className="value">0</span>
                           </li>
                       </ul>
                    </div>
                </li>
            )
        })
        return (
            <div className='home cloud'>
                <div className="header">
                    <span className="title">中物互联数字消防云平台</span>
                    <ul className="clearfix">
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
                <div className='left-side l'>
                    <div className='side-header clearfix'>
                        <Number number='50'></Number>
                        <span>火警总数</span>
                    </div>
                    <div className="side-content">
                        <Scrollbar horizontal={false} peed={0.8}>
                            <ul className='list'>
                                {leftList}
                            </ul>
                        </Scrollbar>
                    </div>
                </div>
                <div className="right-side r">
                    <div className="side-header clearfix">
                        <Number number='150'></Number>
                        <span>预警总数</span>
                    </div>
                    <div className="side-content">
                        <Scrollbar horizontal={false} peed={0.8}>
                            <ul className='list'>
                                {leftList1}
                            </ul>
                        </Scrollbar>
                    </div>
                </div>
                <div className='home-main'>
                    <ul className="home-main-header">
                        <li className='clearfix'>
                            <div className="l">
                                <p><i className="iconfont icon-Equipment"></i></p>
                                <p>项目数</p>
                            </div>
                            <p className="l">634</p>
                        </li>
                        <li className='clearfix'>
                            <div className="l">
                                <p><i className="iconfont icon-Equipment"></i></p>
                                <p>设备数</p>
                            </div>
                            <p className="l">634</p>
                        </li>
                        <li className='clearfix'>
                            <div className="l">
                                <p><i className="iconfont icon-Equipment"></i></p>
                                <p>故障数</p>
                            </div>
                            <p className="l">634</p>
                        </li>
                        <li className='clearfix'>
                            <div className="l">
                                <p><i className="iconfont icon-Equipment"></i></p>
                                <p>运维数</p>
                            </div>
                            <p className="l">634</p>
                        </li>
                    </ul>
                    <div id="map">

                    </div>
                    <div className='main-footer'>
                            <Table width="545" height="170" title="实时预警" icon='icon-FireAlarm' label={this.state.tableLabel} data = {this.state.data}></Table>
                            <Table width="545" height="170" title="实时火警" icon='icon-FireAlarm' label={this.state.tableLabel} data = {this.state.data}></Table>
                    </div>
                </div>
            </div>
        )
    } 
}