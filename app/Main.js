import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header';
import HomeGuest from './components/HomeGuest';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <HomeGuest />
      <Footer />
      
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept()
}