import React from 'react';
import { render } from 'react-dom';
import Main from "./Main";
import Header from "./Header";
import Footer from "./Footer";
import './style.css';

//Das ist ein Stateless Component

const App = () =>
  <div>
    <Header />
    <div className="container">
      <Main />
    </div>
    <Footer />
  </div>

render(<App />, document.getElementById('root'));

