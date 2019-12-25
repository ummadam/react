import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React,{Component} from 'react'
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from "../../firebaseConfig";
import Header from "../header";
import {Link,withRouter} from 'react-router-dom'

class SignIn extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if(values.remember){
                    localStorage.setItem("email",values.email);
                }
                else{
                    localStorage.removeItem("email");
                }
                // console.log('Received values of form: ', values);
                firebase.auth().signInWithEmailAndPassword(values.email,values.password).then(authUser=>{
                    this.props.history.push('/hotels')
                    console.log(authUser)
                }).catch(error=>{
                    console.log(error)
                })
            }
        });
    };
componentDidMount(){
    this.props.form.setFieldsValue({["email"]:localStorage.getItem("email")})
}
    render() {

        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{width:"80%",margin:'0 auto'}}>
                <Header/>

                <Form style={{paddingTop:"100px",width:"80%",margin:"0 auto"}} onSubmit={this.handleSubmit} className="login-form">
                    <p>Get Into Your Account</p>
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                                {
                                    required: true,
                                    message: 'Please input your email!'
                                }
                            ],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Email"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>Remember me</Checkbox>)}
                        <Link to={'/reset'}>
                            Forgot password
                        </Link>
                        <Button type="primary" style={{display:"block",margin:"0 auto"}} htmlType="submit" className="login-form-button">
                            Login
                        </Button>
                        Or <Link to={'/signup'}>register now!</Link>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const WrappedNormalSignInForm = Form.create({ name: 'normal_login' })(SignIn);

export default withRouter(WrappedNormalSignInForm);