import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Axios from 'axios';
Axios.defaults.baseURL = 'http://localhost:8080'

import Header from './components/Header';
import HomeGuest from './components/HomeGuest';
import Home from './components/Home'
import Footer from './components/Footer';
import About from './components/About';
import Terms from './components/Terms';
import CreatePost from './components/CreatePost';
import ViewSinglePost from './components/ViewSinglePost'

function App() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem('complexAppToken')));

  return (
    <BrowserRouter>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Switch>
        <Route path='/' exact>
          {loggedIn ? <Home /> : <HomeGuest /> }
        </Route>
        <Route path='/post/:id'><ViewSinglePost /></Route>
        <Route path='/create-post'><CreatePost /></Route>
        <Route path='/about-us' exact><About /></Route>
        <Route path='/terms' exact><Terms /></Route>
      </Switch>
      <Footer />      
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept()
}