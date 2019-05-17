import  React from 'react'
import './index.scss'
export default class Number extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render(){
        let arr = (Array(4).join('0') + this.props.number).slice(-4).split('')
        const list = arr.map((item,i )=> <span key={i}>{item}</span>)
        return (
            <div className='number'>
                {list}
            </div>
        )
    }
}