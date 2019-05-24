import React,{Component} from 'react';
import Scrollbar from 'react-scrollbar'
import {Tree,DatePicker} from 'element-react'
import {Project} from '@/request/api.js'
import {LineChart} from '@/components/index.js'
import './detaile.scss'
class Detaile extends Component{
    constructor(props){
        super(props)
        this.state = {
            time:new Date(),
            treeData:[],
            basiInfo:[ //基本信息字段
                {label:'设备名称',prop:'DeviceLedgerName'},
                {label:'设备编码',prop:'DeviceCode'},
                {label:'规格类型',prop:'DeviceLedgerName'},
                {label:'设备类型',prop:'DeviceTypeName'},
                {label:'生产厂商',prop:'Manufacturer'},
                {label:'系统类型',prop:'SystemParamName'},
                {label:'保质年限',prop:'DeviceLedgerName'},
                {label:'安装位置',prop:'DeviceLedgerName'},
                {label:'出厂日期',prop:'ManufacturingTime'},
                {label:'启用日期',prop:'OperatingDateTime'},
                {label:'相关参数',prop:'DeviceLedgerParam'},
                {label:'配置参数',prop:'AcsDeviceLedgerParam'},
            ],
            deviceInfo:{ //设备基本信息
            },
            lineData:{
                columns:['周一','周二','周三','周四','周五','周六','周日'],
                rows:[
                    {
                        name:'A',
                        type:'line',
                        stack: '总量',
                        data:[120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name:'B',
                        type:'line',
                        stack: '总量',
                        data:[220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name:'C',
                        type:'line',
                        stack: '总量',
                        data:[150, 232, 201, 154, 190, 330, 410]
                    },
                ]
            },
        }
    }
    count(a){
        this.setState({
            test:a
        })
    }
    /**
     * 查询树状系统分类设备
     */
    queryDevice(){
        Project({
            FAction:'QuerySystemUDeviceLedgerTree'
        })
        .then((data) => {
            console.log(data)
            let treeData = data.FObject
            this.setState({
                treeData
            })
            setTimeout(() => {
/*                 this.$refs.tree.setCurrentKey(this.$route.params.id)
                this.deviceInfo = this.$refs.tree.getCurrentNode()
                this.queryMonitorData(this.deviceInfo)
                this.queryUDeviceEvents(this.deviceInfo) */
            },0)
        }).catch((err) => {
            
        });
    }
    componentWillMount(){
        this.queryDevice()
    }
    componentDidMount(){
        console.log(this.props)
    }
    renderContent(nodeModel, data, store) {
        return (
          <span>
                {data.index===0&&<span>{data.SystemParamName}</span>}
                {data.index===1&&<span>{data.DeviceTypeName}</span>}
                {data.index===2&&<span>{data.DeviceName}</span>}
          </span>);
      }
    render(){
        const {time,basiInfo,deviceInfo,treeData,lineData} = this.state
        return(
            <div className='device-detaile'>
                <div className='l'>
                    <Scrollbar horizontal={false} peed={0.8}>
                        <Tree data={treeData} currentNodeKey={this.props.match.params.id} nodeKey='DeviceID' options={{children:'Data'}} defaultExpandAll={true} highlightCurrent={true} renderContent = {(...args) => this.renderContent(...args)}>

                        </Tree>
                    </Scrollbar>
                </div>
                <div className="device-info">
                    <div>
                        <div className='item-header'>
                            <i className='iconfon icon-Monitoring'></i>
                            实时监测
                        </div>
                        <div className='monitor'>
                            <div className='device-statu'>
                                <div className='l'>
                                    <i className='iconfont icon-FireControl'></i>
                                </div>
                                <div>
                                    <p>1# 配电柜</p>
                                    <p>合闸</p>
                                </div>
                            </div>
                            <ul>
                                {
                                    [1,1,1,1].map((item,i) => {
                                        return(
                                            <li key={i}>
                                                <span className='label'>三相电流（A）</span> 4.08/4/3.3
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            <div className='chart'>
                                <div className='time-select'>
                                    <span>时间 </span>
                                    <DatePicker value={time}></DatePicker>
                                </div>
                                <LineChart data={lineData} color={["#FBA31E","#5FCDF2","#FF3600"]} ></LineChart>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="item-header">
                            <i className="iconfont icon-SZXFY-basicinformation"></i>
                                基本信息
                            <p className="r">
                                <i className="iconfont icon-SZXFY-date"></i>
                                大事记
                            </p>
                        </div>
                        <div className="basi-info l">
                            <ul className="basi-info-list l">
                                {
                                    basiInfo.map((item,i) => {
                                        return(
                                            <li className="l"  key={i}>
                                                <span className="label">{item.label}　</span>
                                                {deviceInfo[item.prop]}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            <div className="device-img r">
                                <div>
                                    <p>
                                        设备照片
                                    </p>
                                </div>
                                <div>
                                    <p>设备二维码</p>
                                </div>
                            </div>
                        </div>
                        <div className="event-record">
                            <Scrollbar horizontal={false} peed={0.8}>
                                <ul>
                                    {
                                        [1,1,1,1].map((item,i) => {
                                            return(
                                                <li key={i}>
                                                    <p className="event-text">过流告警</p>
                                                    <div className="icon-time">
                                                        <p className="event-time">2019.05.04</p>
                                                        <div>
                                                            <div className="circle">
                                                            </div>
                                                            <div className="line">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="event-item">
                                                        <i className="iconfont icon-SZXFY-basicinformation"></i>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                    <li>
                                        <div className="event-year">
                                            {new Date().getFullYear()}
                                        </div>
                                    </li>
                                </ul>
                            </Scrollbar>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Detaile