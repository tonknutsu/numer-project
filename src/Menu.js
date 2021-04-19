import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Bisection from './components/Bisection.Components';
import False from './components/False.Components';
import Onepoint from './components/Onepoint.Components';
import Newton from './components/Newton.Components';
import Secant from './components/Secant.Components';
import Home from './components/Home.Components';


export default class Menu extends Component {
    render() {
        return (

            <div>
                <Router>
                    <aside className="main-sidebar"  >
                        {/* sidebar */}
                        <section className="sidebar">
                            <ul className="sidebar-menu" data-widget="tree">

                                <li className="treeview">
                                    <Link to="fake_url">
                                        <i className="fa fa-tags" aria-hidden="true" />
                                        <span>Root of Equation</span>
                                        <span className="pull-right-container">
                                            <i className="fa fa-angle-left pull-right" />
                                        </span>
                                    </Link>
                                    <ul className="treeview-menu">
                                        <li><Link to="/Bisection"><i className="fa fa-circle-o" />Bisection Method</Link></li>
                                        <li><Link to="/False"><i className="fa fa-circle-o" />False Position Method</Link></li>
                                        <li><Link to="/Onepoint"><i className="fa fa-circle-o" />One-point Iteration</Link></li>
                                        <li><Link to="/Newton"><i className="fa fa-circle-o" />Newton's Method</Link></li>
                                        <li><Link to="/Secant"><i className="fa fa-circle-o" />Secant Method</Link></li>
                                    </ul>
                                </li>
                                <li className="treeview">
                                    <Link to="fake_url">
                                        <i className="fa fa-tags" aria-hidden="true" />

                                        <span>Linear ALgebraic Equation</span>
                                        <span className="pull-right-container">
                                            <i className="fa fa-angle-left pull-right" />
                                        </span>
                                    </Link>
                                    <ul className="treeview-menu">
                                        <li><Link to="/Cramer"><i className="fa fa-circle-o" />Cramer's Rule</Link></li>
                                        <li><Link to="/Gausselimi"><i className="fa fa-circle-o" />Gauss Elimination</Link></li>
                                        <li><Link to="/GaussJ"><i className="fa fa-circle-o" />Gauss Jordan</Link></li>
                                        <li><Link to="/Matrix"><i className="fa fa-circle-o" />Matrix Inversion</Link></li>
                                        <li><Link to="/LU"><i className="fa fa-circle-o" />LU Decomposition</Link></li>
                                        <li><Link to="/Cholesky"><i className="fa fa-circle-o" /> Cholesky Decomposition</Link></li>
                                        <li><Link to="/Jacobi"><i className="fa fa-circle-o" />Jacobi Ireration</Link></li>
                                        <li><Link to="/Gaussseidel"><i className="fa fa-circle-o" />Gauss Seidel Iteration</Link></li>
                                        <li><Link to="/Conjugate"><i className="fa fa-circle-o" />Conjugate Gradient</Link></li>
                                    </ul>
                                </li>
                                <li className="treeview">
                                    <Link to="fake_url">
                                        <i className="fa fa-tags" aria-hidden="true" />
                                        <span>Interpolation and</span> <br /><span>Extrapolation</span>

                                        <span className="pull-right-container">
                                            <i className="fa fa-angle-left pull-right" />
                                        </span>
                                    </Link>
                                    <ul className="treeview-menu">
                                        <li><Link to="/Newtoninter"><i className="fa fa-circle-o" />Newton Interpolation</Link></li>
                                        <li><Link to="/Lagrangeinter"><i className="fa fa-circle-o" />Lagrange Interpolation</Link></li>
                                        <li><Link to="/Splineinter"><i className="fa fa-circle-o" />Spline Interpolation</Link></li>
                                    </ul>
                                </li>
                                <li className="treeview">
                                    <Link to="fake_url">
                                        <i className="fa fa-tags" aria-hidden="true" />
                                        <span>Least-Squares Regression</span>
                                        <span className="pull-right-container">
                                            <i className="fa fa-angle-left pull-right" />
                                        </span>
                                    </Link>
                                    <ul className="treeview-menu">
                                        <li><Link to="/Regress"><i className="fa fa-circle-o" />Regression</Link></li>
                                        <li><Link to="/Multiregress"><i className="fa fa-circle-o" />Multiple Regression</Link></li>
                                    </ul>
                                </li>

                                <li className="treeview">
                                    <Link to="fake_url">
                                        <i className="fa fa-tags" aria-hidden="true" />

                                        <span>Integration</span>
                                        <span className="pull-right-container">
                                            <i className="fa fa-angle-left pull-right" />
                                        </span>
                                    </Link>
                                    <ul className="treeview-menu">
                                        <li><Link to="/trape"><i className="fa fa-circle-o" />Trapezoidal</Link></li>
                                        <li><Link to="/composite"><i className="fa fa-circle-o" />Composite trapezoidal</Link></li>
                                        <li><Link to="/simpson13"><i className="fa fa-circle-o" />Simpson's rule 1/3</Link></li>
                                        <li><Link to="/composimpson"><i className="fa fa-circle-o" />Composite simpson's rule</Link></li>
                                        <li><Link to="/simsonp38"><i className="fa fa-circle-o" />Simpson's rule 3/8</Link></li>

                                    </ul>
                                </li>

                                <li className="treeview">
                                    <Link to="fake_url">
                                        <i className="fa fa-tags" aria-hidden="true" />

                                        <span>Derivative</span>
                                        <span className="pull-right-container">
                                            <i className="fa fa-angle-left pull-right" />
                                        </span>
                                    </Link>
                                    <ul className="treeview-menu">
                                        <li><Link to="/fwoh"><i className="fa fa-circle-o" />FW O(h)</Link></li>
                                        <li><Link to="/bwoh"><i className="fa fa-circle-o" />BW O(h)</Link></li>
                                        <li><Link to="/oh2"><i className="fa fa-circle-o" />O(h<sup>2</sup>)</Link></li>
                                        <li><Link to="/oh4"><i className="fa fa-circle-o" />O(h<sup>4</sup>)</Link></li>
                                        <li><Link to="/fwoh2"><i className="fa fa-circle-o" />FW O(h<sup>2</sup>)</Link></li>
                                        <li><Link to="/bwoh2"><i className="fa fa-circle-o" />BW O(h<sup>2</sup>)</Link></li>
                                        <li><Link to="/euler"><i className="fa fa-circle-o" />Euler's Method</Link></li>
                                        <li><Link to="/heun"><i className="fa fa-circle-o" />Heun's Method</Link></li>
                                        <li><Link to="/modified"><i className="fa fa-circle-o" />Modified Euler</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </section>
                        {/* /.sidebar */}
                    </aside>

                    {/* ลิ้งหน้าเมนู */}
                    <Switch>
                        {/* Rootofeq */}
                            
                         <Route path="/" exact>
                            <Home />
                        </Route>
                        <Route path="/Bisection">
                            <Bisection />
                        </Route>
                        <Route path="/False">
                            <False />
                        </Route>
                        <Route path="/Newton">
                            <Newton />
                        </Route>
                        <Route path="/Secant">
                            <Secant />
                        </Route>
                        <Route path="/Onepoint">
                            <Onepoint />
                        </Route>

                    </Switch>
                </Router>
            </div>

        )
    }
}

