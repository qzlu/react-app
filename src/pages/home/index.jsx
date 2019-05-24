import React from 'react';
import {Number,Table} from '@/components/index'
import Scrollbar from 'react-scrollbar'
import {HomePage} from '@/request/api.js'
import LeftSide from './leftSide.jsx'
const BMap = window.BMap
export default class Index extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            map:null,
            count:{},
            systemList:[], //系统列表（左侧数据）
            fireList:[], //火警信息列表（右侧数据）
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
        this.initMap = this.initMap.bind(this)
        this.logOut = this.logOut.bind(this)
        this.dropdownItemClick = this.dropdownItemClick.bind(this)
        this.queryData = this.queryData.bind(this)
        this.showMarks = this.showMarks.bind(this)
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
    queryData(){
        HomePage({
            FAction:'QueryBlocHomePageCount'
        })
        .then((data) => {
            let [systemList,fireList,wariningData,fireAlarmData,count] = data.FObject&&data.FObject
            this.setState({
                systemList,
                fireList,
                wariningData,
                fireAlarmData,
                count
            })
            setTimeout(() => {
                this.showMarks()
            },0)
        }).catch((err) => {
            console.log(err)
        });
    }
    /**
     * 显示点
     */
    showMarks(){
        let Map = this.state.map
        Map.clearOverlays()
        this.state.fireList.forEach((item,i) => {
            if(item.Flat < 0 || item.Flat == null ||item.Flng < 0 || item.Flng == null){
              return
            }
            const point = new BMap.Point(item.Flat,item.Flng)
            let marker,icon,img,temp
            if(item.FireCount>0){
                img = require('@/assets/image/cloud/index/bMap_icon_alarm.png')
            }else{
                img = require('@/assets/image/cloud/index/bMap_icon.png')
            }
           /*  icon = Map.setIcon(img,34,40) */
            marker = new BMap.Marker(point,{icon:icon})
            /* temp = this.content(item) */
            Map.addOverlay(marker)
            Map.centerAndZoom(point, 11);
            marker.addEventListener('mouseover',e => {
              Map.openInfoWindow(temp,point)
            })
            marker.addEventListener('dblclick',e => {
              this.changeRouter(item)
            })
        })
    }
    changeRouter(item){
        sessionStorage.setItem('projectID',item.ProjectID)
        sessionStorage.setItem('projectName',item.ProjectName)
        this.props.history.push('/indexItem')
    }
    /**
     * 初始化百度地图
     */
    initMap(){
        let map = new BMap.Map('map')
        this.setState({
            map:map
        },() => {
            let _this = this.state
            console.log(_this.map)
        })
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
        //添加地图类型控件
        map.setCurrentCity("深圳");          // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        map.setMapStyle({style:'midnight'});
    }
    componentWillMount(){
        this.queryData()
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
        let _this = this.state;
        const rightList = _this.fireList.map((item,i) => {
            return(
                <li key={i} onDoubleClick = {this.changeRouter.bind(this,item)}>
                    <h4>{item.ProjectName}</h4>
                    <div className="list-content">
                       <div className="statu"></div>
                       <ul  className="param clearfix">
                           <li className="l" style={{marginBottom:'30px'}}>
                               <i className="iconfont icon-FireAlarm"></i>
                               <span className="value">{item.FireCount}</span>
                           </li>
                           <li className="l" style={{marginBottom:'30px'}}>
                               <i className="iconfont icon-Fault"></i>
                               <span className="value">{item.FaultCount}</span>
                           </li>
                           <li className="l">
                               <i className="iconfont icon-SZXFY-Earlywarning"></i>
                               <span className="value">{item.WarningCount}</span>
                           </li>
                           <li className="l">
                               <i className="iconfont icon-SZXFY-Operations"></i>
                               <span className="value">{item.MaintenanceCount}</span>
                           </li>
                       </ul>
                    </div>
                </li>
            )
        })
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
                        <Scrollbar horizontal={false} peed={0.8}>
                            <ul className='list'>
                                {rightList}
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
                            <p className="l">{_this.count.ProjectCount}</p>
                        </li>
                        <li className='clearfix'>
                            <div className="l">
                                <p><i className="iconfont icon-Equipment"></i></p>
                                <p>设备数</p>
                            </div>
                            <p className="l">{_this.count.BlocDeviceCount}</p>
                        </li>
                        <li className='clearfix'>
                            <div className="l">
                                <p><i className="iconfont icon-Equipment"></i></p>
                                <p>故障数</p>
                            </div>
                            <p className="l">{_this.count.FaultCount}</p>
                        </li>
                        <li className='clearfix'>
                            <div className="l">
                                <p><i className="iconfont icon-Equipment"></i></p>
                                <p>运维数</p>
                            </div>
                            <p className="l">{_this.count.MaintenanceCount}</p>
                        </li>
                    </ul>
                    <div id="map">

                    </div>
                    <div className='main-footer'>
                            <Table width="545" height="170" title="实时预警" icon='icon-FireAlarm' label={this.state.tableLabel} data = {_this.wariningData?_this.wariningData.Data:[]}></Table>
                            <Table width="545" height="170" title="实时火警" icon='icon-FireAlarm' label={this.state.tableLabel} data = {_this.fireAlarmData?_this.fireAlarmData.Data:[]}></Table>
                    </div>
                </div>
            </div>
        )
    } 
}