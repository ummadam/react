import { Form, Icon, Input, Button} from 'antd';
import Header from '../header'
import React,{Component} from 'react'
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from "../../firebaseConfig";
import {Link,withRouter} from 'react-router-dom';

class Reset extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        firebase.auth().sendPasswordResetEmail(values.email).then(()=>{
          console.log('success');
          this.props.history.push('/signin')
        }).catch(error=>{
          console.log(error)
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{width:"80%",margin:"0 auto"}}>
         <Header/> 
      <Form style={{paddingTop:"100px",width:"80%",margin:"0 auto"}} onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your username!' },{
              type: 'email',
              message: 'The input is not valid E-mail!',
            }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />,
          )}
        </Form.Item>        
        <Form.Item>
         
          <Button type="primary" htmlType="submit" className="login-form-button">
            Reset
          </Button>
        </Form.Item>
      </Form>
      </div>
    );
  }
}

const WrappedNormalResetForm = Form.create({ name: 'normal_login' })(Reset);

export default withRouter(WrappedNormalResetForm);