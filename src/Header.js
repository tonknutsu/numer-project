import React, { Component } from 'react'

export default class header extends Component {
    render() {
        return (
            <div>
                <header className="main-header">
                    {/* Logo */}
                    <a href="/" className="logo">
                        
                        <span className="logo-mini"><b>N</b>M</span>
                      
           
                        <span className="logo-lg"><b>Numerical Method</b></span>
                    </a>

                    

                    
                  
                    <nav className="navbar navbar-static-top">
              
                        <a href="fake_url" className="sidebar-toggle" data-toggle="push-menu" role="button">

                        </a>

                        <div className="navbar-custom-menu">
                            <ul className="nav navbar-nav">
                            
                                <li className="dropdown user user-menu">
                                    <a href="fake_url" className="dropdown-toggle" data-toggle="dropdown">
                                        
                                       <span className="hidden-xs">Thitima Kongkhum  6004062630094 sec.2</span>
                                  
                                    </a>
                                </li>



                            </ul>
                        </div>



                    </nav>
                </header>
            </div>

        )
    }
}
