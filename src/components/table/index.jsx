import React from 'react';
import Scrollbar from 'react-scrollbar'
import './index.scss'

export default class Table extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render(){
        const header = this.props.label.map((item,i) => {
            return(
                <th key={i} width={item.width}>{item.label}</th>
            )
        })
        const row = this.props.data.map((item,i) => {
            const colum = this.props.label.map((element,j) => {
                return(
                    <td key={j} width = {element.width}>
                        {item[element.prop]}
                    </td>
                )
            });
            return (
                <tr key={i}>
                    {colum}
                </tr>
            )
        })
        const width = {width:this.props.width+'px'}
        const height = {height:this.props.height+'px'}
        return(
            <div className="zw-table" style = {width}>
                <div className="title">
                  <i className={`iconfont ${this.props.icon}`}></i>
                  {this.props.title}
                </div>
                <table className="table-header">
                    <thead>
                        <tr>
                            {header}
                        </tr>
                    </thead>
                </table>
                <div className="table-body" style={height}>
                    <Scrollbar>
                        <table>
                            <tbody>
                                {row}
                            </tbody>
                        </table>
                    </Scrollbar>
                </div>
            </div>
        )
    }
}
