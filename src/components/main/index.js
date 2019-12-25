import React, {Component} from 'react';
import Header from '../header'
import {Button,Card,Col,Row,Modal, Form, Input,Icon,Menu} from 'antd'


import * as firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from "../../firebaseConfig";
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


//import FormItem from "antd/es/form/FormItem";

const { SubMenu } = Menu;

class Main extends Component{
    constructor(){
        super();
        this.state={
            // count: 0,
            // name: 'Dinara',
            // age: 28,
            // show: false,
            visible: false,
            visibleEdit: false,
            id: null,
            title: '',
            description: '',
            author: '',
            editId: null,
            editTitle: '',
            editDescription: '',
            editAuthor: '',
            idGlobal:null,
            blogs: []

        }
    }
    onChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleOk=()=>{
        let data ={
            id: this.state.id,
            title: this.state.title,
            description: this.state.description,
            author: this.state.author
        }
        //this.props.blog.push(data);
        db.collection("blogs").add(data).then(
            function(doc){
                console.log("documentId", doc.id)
            }).catch(function(error){
                console.log("document error", error);
            });
        this.setState({
            visible:false,
            id: null,
            title: '',
            description: '',
            author: ''
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
            title: this.state.editTitle,
            description: this.state.editDescription,
            author: this.state.editAuthor
        }
        this.props.blog.splice(this.state.idGlobal,1,data);
        this.setState({
            visibleEdit:false,
            editId: null,
            editAuthor:'',
            editDescription:'',
            editTitle: ''
        })
    }
    handleDelete=(i)=>{
        this.setState({});
        this.props.blog.splice(i,1);
    }
    handleEdit=(item,i)=>{
                
        this.setState({
            visibleEdit:true,                   
            editId: item.id,
            editTitle: item.title,
            editDescription: item.description,
            editAuthor: item.author,
            idGlobal:i
            })
            }
    // onClick=(value)=>{
    //     this.setState({
    //             count: this.state.count+value,
    //         }
    //     )
    // }
    // onMouseOver=(value)=>{
    //     if(value)
    //         alert('Hello! '+ 'My name is '+this.state.name+ ' and my age: '+ this.state.age);
        

    // }
    
    async componentDidMount(){
        const data = await db.collection("blogs").get();
        return this.setState({
            blogs:data.docs
        })
    };
    render(){
        //const {show, name, age} = this.state;
        const {id,title,description,author,editAuthor,editDescription,editId,editTitle,idGlobal} = this.state;
        // let message = '';
        // if(show){
        //     alert('Hello! '+ 'My name is '+ name + ' and my age: '+ age);

        // }
        const {blog} = this.props;
        const {blogs} = this.state;
        let blogItem = blogs.map((item,i)=>(
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
                    <p>{item.data().title}</p>
                    <p>{item.data().description}</p>
                    <p>{item.data().author}</p>
                </Card>
            </Col>

        ));
        
        return(
            <div className="main">           
                <Header/>                

                <Row gutter = {[16,16]}>
                    {blogItem}
                </Row>
                <Button onClick={this.handleOpenModal}>
                    Add Blog
                </Button>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                    <Form>
                       
                            <Input name="id" value={id} onChange={this.onChange} placeholder="Enter id"/>
                        
                        
                            <Input name="title" value = {title} onChange={this.onChange} placeholder="Enter title"/>
                        
                      
                            <Input name="description" value = {description} onChange={this.onChange} placeholder="Enter description"/>
                        
                            <Input name="author" value = {author} onChange={this.onChange} placeholder="Enter author"/>
                       
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
                        
                        
                            <Input name="editTitle" value = {editTitle} onChange={this.onChange} placeholder="Enter title"/>
                        
                      
                            <Input name="editDescription" value = {editDescription} onChange={this.onChange} placeholder="Enter description"/>
                        
                            <Input name="editAuthor" value = {editAuthor} onChange={this.onChange} placeholder="Enter author"/>
                       
                    </Form>
                </Modal>
                {/* <Button onClick={()=>this.onClick(1)}>PLUS</Button>
                {this.state.count}
                <Button onClick={()=>this.onClick(-1)}>MINUS</Button>
                <Button onMouseOver={()=>this.onMouseOver(true)}>Hello</Button>
                {message} */}
            </div>
        )
    }
}

export default Main
