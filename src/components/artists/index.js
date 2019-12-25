import React, {Component} from 'react';
import Header from '../header'
import {Button,Form, Input,Icon,Checkbox,Col ,Card} from 'antd'
import {getArtists} from '../../actions/artistAction'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


class Artists extends Component{

    constructor(){
        super();
        this.state={
            name: ""
        }

    }

    onKeyUp =(e)=> {
        this.props.getArtists(e.target.value);
    }
    // handleSubmit = e => {
    //     e.preventDefault();
    //     this.props.form.validateFields((err, values) => {
    //       if (!err) {
    //         this.props.getArtists(values.name);
    //         // localStorage.setItem("name",values.name);
    //         // this.setState({});
    //         // console.log('Received values of form: ', values.name);
    //       }
    //     });
    //   };

    // componentDidMount(){

    //     this.props.getArtists(localStorage.getItem("name"));
        
    // }
    render(){
        
        // const { getFieldDecorator } = this.props.form;
        const {artists} = this.props.artist; 
        console.log(artists);
        let blogItem = '';
        if(artists && artists.artists && artists.artists.length){
            blogItem = artists.artists.map((item,i)=>(
                <Col span = {6} key = {i}>
                    <Card title="CARD" extra={  <div className="extra">
                    <div><Link to={`/artists/${item.idArtist}`}>Music videos</Link></div>
                    <div><Link to={`/artists/${item.strArtist}`}>Albums</Link> </div>             
                    </div>}
                style={{ width: 300 }}>
                        <p>{item.strArtist}</p>
                        <p>{item.strGenre}</p>
                        <p>{item.strLabel}</p>
                        <img src={item.strArtistThumb} style={{ width:"100px"}}/>
                    </Card>
                </Col>  
                ));    

        }
     
        return(
            <div style={{width:"80%",margin:'0 auto'}}>
                <Header/>
                <Input placeholder="Enter artist name" onKeyUp={this.onKeyUp} />
                {blogItem}
                {/* <Form style={{paddingTop:"100px",width:"80%",margin:"0 auto"}} onSubmit={this.handleSubmit} className="login-form">
                    <p>GET_ARTISTS</p>
                    <Form.Item>
                        {getFieldDecorator('name', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input name of artist!'
                                }
                            ],
                        })(
                            <Input
                              
                                placeholder="name"
                            />,
                        )}
                    </Form.Item>
                    
                    <Form.Item>
                        
                        <Button type="primary" style={{display:"block",margin:"0 auto"}} htmlType="submit" className="login-form-button">
                            OK
                        </Button>
                       
                    </Form.Item>
                </Form> */}
            </div>

        )
    }

}

const mapStateToProps=(state)=>({
    artist: state.artist
});

const NormalForm = Form.create({ name: 'normal_login' })(Artists);
export default connect(mapStateToProps,{getArtists})  (NormalForm)
