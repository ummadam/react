import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import Main from './components/main'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import WrappedNormalSignUpForm from './components/signUp'
import WrappedNormalSignInForm from './components/signIn'
import WrappedNormalResetForm from './components/reset'
import Profile from './components/profile'
import Hotels from './components/hotels'
import NormalForm from './components/artists'
import MusicVideos from './components/artists/MusicVideos'
import Albums from './components/artists/Albums'
import {Provider} from 'react-redux'
import store from './store'
import Favorites from './components/hotels/Favorites';

const blogs = [
  {
    id : 1,
    title: "title1",
    description: "des2",
    author: "author1"
  },
  {
    id : 2,
    title: "title2",
    description: "desc2",
    author: "author2"
  },
  {
    id : 3,
    title: "title3",
    description: "desc3",
    author: "author3"
  },
  {
    id : 4,
    title: "title4",
    description: "desc4",
    author: "author4"
  }
];

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">  
          <Router>
            <Switch>
              <Route exact path={'/'} component={()=><Main blog = {blogs}/>}/>
              <Route exact path={'/signup'} component={WrappedNormalSignUpForm}/>
              <Route exact path={'/signin'} component={WrappedNormalSignInForm}/>
              <Route exact path={'/reset'} component={WrappedNormalResetForm}/>
              <Route exact path={'/profile'} component={Profile}/>
              <Route exact path={'/hotels'} component={Hotels}/>
              <Route exact path={'/hotels/favorites'} component={Favorites}/>
              <Route exact path={'/artists'} component={NormalForm}/>
              <Route exact path={'/artists/:id'} component={MusicVideos}/>
              <Route exact path={'/artists/:name'} component={Albums}/>
            </Switch>    
          </Router>
          
        </div>
      </Provider>
    );
  }
}

export default App;
