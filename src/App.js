import React, { Component } from 'react'
import Header from './Header';
import Menu from './Menu';
import Footer from './footer';


export default class App extends Component {
  render() {
    return (
      
      <div>

         <Header />
   
         <Menu/>

         <Footer />

      </div>
    )
  }
}
