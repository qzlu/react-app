import React,{Component} from 'react'
import echarts from 'echarts'
import uuidv1 from 'uuid/v1'
class LineChart extends Component{
    constructor(props){
        super(props)
        this.state = {
            id:null,
        }
    }
    /**
     * 绘制折现图
     */
    showChart() {
        //生成line 坐标图
        var dom = document.getElementById(this.state.id);
        var myChart = echarts.init(dom);
        var option = null;
        option = {
          title: {
            // text: '折线图堆叠'
          },
          tooltip: {
            trigger: "axis"
          },
          textStyle: {
            fontWeight: "normal", //标题颜色
            color: "#fff"
          },
          legend: {
            top:'38px',
            right:'96px',
            icon:'circle',
            itemWidth:10,
            textStyle: {
              fontWeight: "normal", //标题颜色
              color: "#F1F2F2"
            }
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          toolbox: {
            feature: {
            }
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            axisLine: {
              //y轴色
              lineStyle: {
                color: "#5F6B91",
                width: 1
              }
            },
            axisLabel:{
              color:'#A5EFFC'
            },
            data: this.props.data.columns
          },
          yAxis: {
            type: "value",
            splitLine: { show: false }, //去除网格线
            axisLine: {
              lineStyle: {
                color: "#5F6B91",
                width: 1
              }
            },
            axisLabel:{
              color:'#A5EFFC'
            },
          },
          series: this.props.data.rows,
          color: this.props.color
        };
        if (option && typeof option === "object") {
          myChart.setOption(option, true);
        }
    }
    componentWillMount(){
        this.setState({
            id:uuidv1()
        })
    }
    componentDidMount(){
        this.showChart.call(this)
    }
    render(){
        return(
            <div  id={this.state.id} style={{width:'100%',height:'100%'}}>
            </div>
        )
    }
}
export default LineChart