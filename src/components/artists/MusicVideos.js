import React, {Component} from 'react';
import Header from '../header'
// import firebase from "firebase"
import {Button,Card,Col,Row,Modal, Form, Input,Icon,Menu} from 'antd'
import {getMvids} from '../../actions/artistAction'
import {connect} from 'react-redux'

class MusicVideos extends Component{

    constructor(){
        super();
        this.state={
            
        }

    }
componentDidMount(){
   this.props.getMvids(this.props.match.params.id);
}
    render(){
       const {mvids}=this.props.artist;
       console.log(mvids);
       let blogItem = '';
        if(mvids && mvids.mvids && mvids.mvids.length){
            blogItem = mvids.mvids.map((item,i)=>(
                <Col span = {6} key = {i}>
                    <Card title="CARD" extra={  <div className="extra">                                 
                    </div>}
                style={{ width: 300 }}>
                        <p>{item.strTrack}</p>                       
                        <img src={item.strTrackThumb} style={{ width:"100px"}}/>
                        <iframe src={`https://www.youtube.com/embed/${item.strMusicVid.substring(32)}`}/>
                    </Card>
                </Col>  
                )); 
            }
        return(
            <div className = "main">
                <Header/>
               {blogItem}
            </div>

        )
    }

}

const mapStoreToProps=(state)=>({
    artist: state.artist
})
export default connect(mapStoreToProps,{getMvids})(MusicVideos)
