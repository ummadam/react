import React, {Component} from 'react';
import Header from '../header'
// import firebase from "firebase"
import {Button,Card,Col,Row,Modal, Form, Input,Icon,Menu} from 'antd'
import {getAlbums} from '../../actions/artistAction'
import {connect} from 'react-redux'

class Albums extends Component{

    constructor(){
        super();
        this.state={
            
        }

    }
componentDidMount(){
   this.props.getAlbums(this.props.match.params.name);
}
    render(){
       const {albums}=this.props.artist;
       console.log(albums);
       let blogItem = '';
        if(albums && albums.album && albums.album.length){
            blogItem = albums.album.map((item,i)=>(
                <Col span = {6} key = {i}>
                    <Card title="CARD" extra={  <div className="extra">                                 
                    </div>}
                style={{ width: 300 }}>
                        <p>{item.strAlbum}</p>  
                        <p>{item.strStyle}</p>
                        <p>{item.strGenre}</p>
                        <p>{item.strLabel}</p>                     
                        <img src={item.strAlbumThumb} style={{ width:"100px"}}/>
                        <p>{item.intYearRealesed}</p>
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
export default connect(mapStoreToProps,{getAlbums})(Albums)
