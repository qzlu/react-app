import React from "react";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import {createBrowserHistory } from 'history'
import routes from '@/router/index'
const history = createBrowserHistory()
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      ratioHeigt:null,
      ratioWidth:null
    }
    this.getHeight = this.getHeight.bind(this)
  }
  async getHeight(){
    await this.setState({
      ratioWidth:window.innerWidth/1920,
      ratioHeigt:window.innerHeight/1080
    })
  }
  routerWillLeave(nextLocation) {
      console.log(nextLocation)
      return 'Your work is not saved! Are you sure you want to leave?'
  }
  componentWillMount(){
    if(!sessionStorage.getItem('FToken')){
      console.log(history)
      history.push('/Login')
    }
  }
  componentDidMount(){
    this.getHeight()
    window.addEventListener('resize',this.getHeight)
    console.log(2)
  }
  componentWillReceiveProps(){
    console.log(this.props)
    console.log(3)
  }
  shouldComponentUpdate(){
    console.log('更新了')
    return true
  } 
  render() {
    let style = {
      transform: `scale(${this.state.ratioWidth},${this.state.ratioHeigt})`,
      transformOrigin: "left top ",
      backgroundSize: "100% 100%",
    }
    return (
      <div className="main" style={style}>
        <Router>
          <Switch>
            {
              routes.map((item,i) => {
                return(
                  <Route key={i} exact path={item.path} component={item.component} />
                )
              })
            }
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;