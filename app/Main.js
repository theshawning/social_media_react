import React, { useState, useReducer, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useImmerReducer } from 'use-immer'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Axios from 'axios'
Axios.defaults.baseURL = 'http://localhost:8080'

import StateContext from './StateContext'
import DispatchContext from './DispatchContext'

import Header from './components/Header'
import HomeGuest from './components/HomeGuest'
import Home from './components/Home'
import Footer from './components/Footer'
import About from './components/About'
import Terms from './components/Terms'
import CreatePost from './components/CreatePost'
import ViewSinglePost from './components/ViewSinglePost'
import FlashMessages from './components/FlashMessages'
import Profile from './components/Profile'

function App() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem('complexAppToken')),
    flashMessages: [],
    user: {
      token: localStorage.getItem('complexAppToken'),
      username: localStorage.getItem('complexAppUsername'),
      avatar: localStorage.getItem('complexAppAvatar')
    }
  }

  function ourReducer(draft, action) {
    switch (action.type) {
      case 'login':
        draft.loggedIn = true
        draft.user = action.data
        return
      case 'logout':
        draft.loggedIn = false
        return
      case "flashMessage":
        draft.flashMessages.push(action.value)
        return
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem('complexAppToken', state.user.token)
      localStorage.setItem('complexAppUsername', state.user.username)
      localStorage.setItem('complexAppAvatar', state.user.avatar)
    } else {
      localStorage.removeItem('complexAppToken')
      localStorage.removeItem('complexAppUsername')
      localStorage.removeItem('complexAppAvatar')
    }
  }, [state.loggedIn])

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages messages={state.flashMessages} />
          <Header />
          <Switch>
            <Route path='/profile/:username'><Profile /></Route>
            <Route path='/' exact>
              {state.loggedIn ? <Home /> : <HomeGuest /> }
            </Route>
            <Route path='/post/:id'><ViewSinglePost /></Route>
            <Route path='/create-post'>
              <CreatePost />
            </Route>
            <Route path='/about-us' exact><About /></Route>
            <Route path='/terms' exact><Terms /></Route>
          </Switch>
          <Footer />      
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept()
}