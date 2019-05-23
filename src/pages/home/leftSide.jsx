import React,{Component} from 'react';
class LeftSide extends Component{
    constructor(props){
        super(props)
    }
    render(){
        if(!Array.isArray(this.props.data)) return
        let systemList = this.props.data.map((item,i) => {
            let alarmObj = item.find(obj => obj.AlarmCount )
            return {
                SystemParamName:item[0].SystemParamName,
                AlarmCount:alarmObj?alarmObj.AlarmCount:0,
                iconName:item[0].SystemParamIconName,
                data:item
            }
        })
        const leftList = systemList.map((item,i) => {
            return(
                <li  key={i}>
                <h4>
                   <i className={`iconfont ${item.iconName}`}></i>
                   {item.SystemParamName}
               </h4>
               <div className="list-content">
                   <div className="statu">
                   </div>
                   <ul className="param">
                        {
                            item.data.map((obj,j) => {
                                return(
                                    <li key={j}>
                                        <p className="l">
                                            <i className={`iconfont ${obj.IconName}`}></i>
                                            {obj.CountName}
                                        </p>
                                        <span className="value">
                                        {obj.DeviceCount} / {obj.AlarmCount}
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
        return(
            <ul className='list'>
                {leftList}
            </ul>
        )
    }
}
export default LeftSide