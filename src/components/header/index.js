import React, {Component} from 'react';
import {Menu} from 'antd';
import {Link,withRouter} from "react-router-dom";
import './header.css';
import * as firebase from 'firebase/app';



class Header extends Component{

    constructor(){
        super();
        this.state={
            auth:false
        }

    }
    componentDidMount(){
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                this.setState({
                    auth: true
                })
            }
        })
    }
    signOut=()=>{
        firebase.auth().signOut().then(r=>{
            this.props.history.push('/')
        }).catch(error=>{
            console.log(error)
        })
    }
    render(){
        return(
            <div className = "header">
                <Menu mode = "horizontal">
                    <Menu.Item key = "1">
                    <Link to={'/'}>Home</Link>                        
                    </Menu.Item>
                    <Menu.Item key = "2">
                        Blog
                    </Menu.Item>
                    <Menu.Item key = "3">
                        Gallery
                    </Menu.Item>
                    <Menu.Item key = "4">
                        Help
                    </Menu.Item>
                    {this.state.auth ? <Menu.Item onClick={this.signOut} key="5">
                            Log out
                        </Menu.Item> :  <Menu.Item key="5">
                            <Link to={'/signup'}>Sign up</Link>
                        </Menu.Item> }
                    <Menu.Item key = "6">
                    <Link to={'/artists'}>Artists</Link>  
                    </Menu.Item>
                    <Menu.Item key = "7">
                    <Link to={'/hotels'}>Hotels</Link>  
                    </Menu.Item>
                </Menu>
            </div>

        )
    }

}

export default withRouter(Header)
