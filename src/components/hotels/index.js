import React, {Component} from 'react';
import Header from '../header'
import {Button,Card,Col,Row,Modal, Form, Input,Icon,Menu} from 'antd'
import {Link} from 'react-router-dom';



import * as firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from "../../firebaseConfig";
// const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


//import FormItem from "antd/es/form/FormItem";

const { SubMenu } = Menu;

class Hotels extends Component{
    constructor(){
        super();
        this.state={           
            visible: false,
            visibleEdit: false,
            id: null,
            name: '',
            email: '',
            phone: '',
            favorite: false,
            editId: null,
            editName: '',
            editEmail: '',
            editPhone: '',
            editFavorite: false,
            idGlobal:null,
            hotels: []

        }
    }
    handleFav=()=>{
        this.setState({           
            favorite:true
        })
        
    }
    onChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleOk=()=>{
        let data ={
            id: this.state.id,
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            favorite: this.state.favorite
        }
        //this.props.blog.push(data);
        db.collection("hotels").add(data).then(
            function(doc){
                console.log("documentId", doc.id)
            }).catch(function(error){
                console.log("document error", error);
            });
        this.setState({
            visible:false,
            id: null,
            name: '',
            email: '',
            phone: '',
            favorite: false
        })
    }
    handleCancel=()=>{
        this.setState({
            visible:false
        })
    }
    handleOpenModal=()=>{
        this.setState({
            visible:true
        })
    }
    handleEditCancel=()=>{
        this.setState({
            visibleEdit:false
        })
    }
    handleEditOk=()=>{
        let data = {
            id: this.state.editId,
            name: this.state.editName,
            email: this.state.editEmail,
            phone: this.state.editPhone,
            favorite: this.state.editFavorite
        }
        this.props.blog.splice(this.state.idGlobal,1,data);
        this.setState({
            visibleEdit:false,
            editId: null,
            editName:'',
            editEmail:'',
            editPhone: '',
            editFavorite: false
        })
    }
    handleDelete=(i)=>{
        this.setState({});
        this.props.blog.splice(i,1);
    }
    handleEdit=(item,i)=>{
                
        this.setState({
            visibleEdit:true,                   
            editId: item.data().id,
            editName: item.data().name,
            editEmail: item.data().email,
            editPhone: item.data().phone,
            editFavorite: item.data().favorite,
            idGlobal:i
            })
            }
   
    
    async componentDidMount(){
        const data = await db.collection("hotels").get();
        return this.setState({
            hotels:data.docs
        })
    };
    render(){
       
        const {id,name,phone,email,favorite,editName,editPhone,editId,editEmail,editFavorite,idGlobal} = this.state;
       
        // const {blog} = this.props;
        const {hotels} = this.state;
        console.log(hotels.data);
        let blogItem = hotels.map((item,i)=>(
            
            <Col span = {6} key = {i}>
                <Card title="CARD" extra={  <div className="extra">
                <Button onClick={()=>this.handleEdit(item,i)}>
                    <Icon type="edit"  />Edit
                </Button>
                <Button onClick={()=>this.handleDelete(i)}>
                    <Icon type="delete"  />Delete 
                </Button>               
                </div>}
               style={{ width: 300 }}>
                    <p>{item.data().name}</p>
                    <p>{item.data().email}</p>
                    <p>{item.data().phone}</p>
                    <p>{item.data().favorite}</p>
                    {/* if({item.data().favorite}) ? <p><Icon type="star" style={{color:"yellow"}} theme='filled'/></p> : <p><Icon type="star"/></p> */}
                </Card>
            </Col>

        ));
        
        return(
            <div className="main">           
                <Header/>                

                <Row gutter = {[16,16]}>
                    {blogItem}
                </Row>
                <Link to={'/hotels/favorites'}>Favorites</Link>
                <Button onClick={this.handleOpenModal}>
                    Add Hotel
                </Button>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                    <Form>
                       
                            <Input name="id" value={id} onChange={this.onChange} placeholder="Enter id"/>
                        
                        
                            <Input name="name" value = {name} onChange={this.onChange} placeholder="Enter name"/>
                        
                      
                            <Input name="email" value = {email} onChange={this.onChange} placeholder="Enter email"/>
                        
                            <Input name="phone" value = {phone} onChange={this.onChange} placeholder="Enter phone"/>
                            <Icon type="star"  name="favorite" value={favorite} onClick={this.handleFav} />
                       
                    </Form>
                </Modal>
                <Modal
                    title="Edit Modal"
                    visible={this.state.visibleEdit}
                    onOk={this.handleEditOk}
                    onCancel={this.handleEditCancel}
                    >
                    <Form>
                       
                            <Input name="editId" value={editId} onChange={this.onChange} placeholder="Enter id"/>
                        
                        
                            <Input name="editName" value = {editName} onChange={this.onChange} placeholder="Enter name"/>
                        
                      
                            <Input name="editEmail" value = {editEmail} onChange={this.onChange} placeholder="Enter email"/>
                        
                            <Input name="editPhone" value = {editPhone} onChange={this.onChange} placeholder="Enter phone"/>
                            <Icon type="star" name="editFavorite" value={editFavorite} onClick={this.handleFav}/>
                    </Form>
                </Modal>
               
            </div>
        )
    }
}

export default Hotels
