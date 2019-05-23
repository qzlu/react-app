import React from 'react';
import {Number,Table} from '@/components/index'
import Scrollbar from 'react-scrollbar'
import {HomePage} from '@/request/api.js'
import LeftSide from './leftSide.jsx'
import { Link} from "react-router-dom";
import './index.scss'
export default class Index extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            map:null,
            count:[],
            systemList:[], //系统列表（左侧数据）
            fireAlarmData:null,
            wariningData:null,
            tableLabel:[
                {
                    label:'项目',
                    prop:'ShortName',
                    width:'25%'
                },
                {
                    label:'告警时间',
                    prop:'AlarmTime',
                    width:'30%'
                },
                {
                    label:'告警内容',
                    prop:'AlarmText',
                    width:'25%'
                },
                {
                    label:'当前值',
                    prop:'AlarmData',
                    width:'20%'
                }
            ],
        }
        this.queryData = this.queryData.bind(this)
    }
    queryData(){
        HomePage({
            FAction:'QueryProjectHomePageCount'
        })
        .then((data) => {
            let [systemList,wariningData,fireAlarmData,count] = data.FObject&&data.FObject
            this.setState({
                systemList,
                wariningData,
                fireAlarmData,
                count
            })
        }).catch((err) => {
            console.log(err)
        });
    }
    componentWillMount(){
        this.queryData()
    }
    componentDidMount(){
    }
    componentWillReceiveProps(){
    }
    shouldComponentUpdate(){
      console.log('更新了')
      return true
    }
    render(){
        let _this = this.state;
        return (
            <div>
                <div className='left-side l'>
                    <div className='side-header clearfix'>
                        <Number number={_this.fireAlarmData?_this.fireAlarmData.FTotalCount:0}></Number>
                        <span>火警总数</span>
                    </div>
                    <div className="side-content">
                        <Scrollbar horizontal={false} peed={0.8}>
                            <LeftSide data={_this.systemList}></LeftSide>
                        </Scrollbar>
                    </div>
                </div>
                <div className="right-side r">
                    <div className="side-header clearfix">
                        <Number number={_this.wariningData?_this.wariningData.FTotalCount:0}></Number>
                        <span>预警总数</span>
                    </div>
                    <div className="side-content">
                        <div style = {{height:'50%'}}>
                            <Table width="545" height="370" title="实时预警" icon='icon-FireAlarm' label={this.state.tableLabel} data = {_this.wariningData?_this.wariningData.Data:[]}></Table>
                        </div>
                        <div style = {{height:'50%'}}>
                            <Table width="545" height="370" title="实时火警" icon='icon-FireAlarm' label={this.state.tableLabel} data = {_this.fireAlarmData?_this.fireAlarmData.Data:[]}></Table>
                        </div>
                    </div>
                </div>
                <div className='home-main'>
                    <div className='device-list'>
                        <h4>设备总况</h4>
                        <div className='type-list'>
                            <Scrollbar horizontal={false} peed={0.8}>
                                {
                                    _this.count.map((item,i) => {
                                        return(
                                            <div key={i}>
                                                <h5>
                                                    <i className="iconfont icon-Lift"></i>
                                                    <span>{item.SystemParamName}（{item.data.length}）</span>
                                                </h5>
                                                <ul className='device'>
                                                    {
                                                        item.data.map((device,j) => {
                                                            return(
                                                                <li key={j}>
                                                                    <Link to={`/detaile/${device.DeviceID}`}>
                                                                        <div className='icon'>
                                                                            <p><i className={`iconfont ${device.DeviceTypeIconName}`}></i></p>
                                                                            <p className="device-status">{device.ShowText}</p>
                                                                        </div>
                                                                        <div className='device-info'>
                                                                            <h6>{device.DeviceName}</h6>
                                                                        </div>
                                                                    </Link>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        )
                                    })
                                }
                            </Scrollbar>
                        </div>
                    </div>
                </div>
            </div>
        )
    } 
}