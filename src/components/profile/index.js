import React, {Component} from 'react';
import Header from '../header'
import firebase from "firebase"
import {Button,Card,Col,Row,Modal, Form, Input,Icon,Menu} from 'antd'

class Profile extends Component{

    constructor(){
        super();
        this.state={
            name: ""
        }

    }
componentDidMount(){
    firebase.auth().onAuthStateChanged((user)=>{
        if(user){
            this.setState({
               name: user.providerData[0].displayName
            })
            //console.log(user.providerData[0])
        }
    })
}
    render(){
        const {name} = this.state;
        return(
            <div className = "main">
                <Header/>
                <Card title="CARD" extra={  <div className="extra">
                            
                </div>}
               style={{ width: 300 }}>
                    <p>{name}</p>
                    
                </Card>
            </div>

        )
    }

}

export default Profile
