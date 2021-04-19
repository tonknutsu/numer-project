import React, { Component } from 'react'
import axios from 'axios';
import Plot from 'react-plotly.js';
import * as math from 'mathjs';


var  X ,Y ,XM ,error ,FXL ,FXR ,FXM ;
export default class False extends Component {
    constructor(props) {
        super(props);
        this.state = { Arr: [], xl: "", xr: "", E: "", submitted: true };
        X=[];
        Y=[];
        XM = [];
        error = [];
        FXL =[]; 
        FXR =[];
        FXM =[];
        this.clear = this.clear.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.FalsePositionMethod = this.FalsePositionMethod.bind(this);
    }

    clear(event) {
        event.preventDefault();
        this.setState({ Arr: [], X: [], Y: [], XM: [], error: [], FXL: [], FXR: [], FXM: [] });
        this.setState({ xl: "" });
        this.setState({ xr: "" });
        this.setState({ E: "" });
        this.setState({ submitted: true });
    }

    handleSubmit(event) {
        let str = this.state.E;
        let c = 0;
        for (let i = 0; i < str.length; i++) {
            if (str[i] === "x" || str[i] === "X") {
                c++;
            }
        }
        if ((str.length !== 0) && (c !== 0) && this.state.submitted  && this.state.xl !== "" && this.state.xr !== "") {
            this.FalsePositionMethod();
            this.setState({ submitted: false });
        }
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        this.setState({ submitted: true });
        this.setState({ Arr: [] });
    }

    FalsePositionMethod(event) {
        X = [];
        Y = [];
        XM = [];
        error = [];
        FXL =[]; 
        FXR =[];
        FXM =[];
        var func = (x) => {
            let scope = { x: x }
            let code = math.compile(this.state.E);
            return code.eval(scope).toFixed(6);
        };
        var err = (x0, x1) => { return Math.abs((x1 - x0) / x1) * 100 };
        var arr;
        var data = { xl: 0, xr: 0, xm: 0,  err: "", fxl: 0, fxr: 0, fxm: 0,  count: 1 };
        var t = true;
        var xOld = 0;
        data.xl = parseFloat(this.state.xl);
        data.xr = parseFloat(this.state.xr);
        while (t) {
            data.fxl = func(data.xl);
            data.fxr = func(data.xr);
            data.xm = parseFloat(((data.xl * data.fxr) - (data.xr * data.fxl)) / (data.fxr - data.fxl));
            data.fxm = func(data.xm);
            if (data.count !== 1) {
                data.err = err(xOld, data.xm);
            }
            arr = this.state.Arr;
            arr.push({ xl: data.xl, xr: data.xr, xm: data.xm, err: data.err, fxl: data.fxl, fxr: data.fxr, fxm: data.fxm, count: data.count });
            if (func(data.xm) === 0 || data.count>15) {
                t = false;
            }
            else if (func(data.xl) * func(data.xm) < 0) {
                data.xr = data.xm;
            }
            else if (func(data.xl) * func(data.xm) > 0) {
                data.xl = data.xm;
            }
            data.count++;
            xOld = data.xm;

            /* จัดการข้อมูลให้อยู่ใน Format Array และ เพิ่มค่าเข้าไปในตัวแปร จนครบวูป*/
            /*show Chart */
            X.push(data.count);
            Y.push(data.err);

            XM.push(data.xm);
            FXL.push(data.fxl);
            FXR.push(data.fxr);
            FXM.push(data.fxm);
            error.push(data.err);
        
            }
        
            /*API Insert into Database MongoDB */
            const falseInsert = {
            eq: this.state.E,
            xl: this.state.xl,
            xr: this.state.xr,
            xm: XM,
            fxl: FXL,
            fxr: FXR,
            fxm: FXM,
            error: error

            };
            console.log(falseInsert);
        
            axios.post('http://localhost:5000/false/add', falseInsert)
            .then(res => { 
            console.log(res.data)
            })
            .catch(error => {
                console.log(error)
            });

        }



    render() {
        const DataRow = (props) => {
            return (<tr><td>{props.data.count}</td>
                <td>{props.data.xl}</td>
                <td>{props.data.xr}</td>
                <td>{props.data.xm}</td>
                <td>{props.data.fxl}</td>
                <td>{props.data.fxr}</td>
                <td>{props.data.fxm}</td>
                <td>{props.data.err}%</td>
            </tr>);
        }
        let rows = this.state.Arr.map(x => { return <DataRow key={x.count} data={x} /> });


        return (
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h2><b>False Position Method</b></h2>
                </section>


                {/* Main content */}
                <section className="content">
                    <div className="row">
                        <div>
                            {/* Horizontal Form */}
                            <div className="col-sm-5" >

                                <div className="box box-info">

                                    <div className="box-header with-border">
                                        <h2 >Input</h2>
                                    </div>
                                    {/* /.box-header */}
                                    {/* form start */}


                                    <form id="F" className="form-horizontal" onSubmit={this.handleSubmit}>
                                        <div className="box-body">
                                            {/* .ใส่โจทย์ */}
                                            <div className="form-group">
                                                <label className="col-sm-3 control-label">Equation :</label>
                                                <div className="col-sm-5">
                                                    <input className="form-control" name="E" type="text" value={this.state.E}
                                                        onChange={this.handleChange} placeholder="Enter Equation" />
                                                </div>
                                            </div>

                                            {/* ค่า xl */}
                                            <div className="form-group ">
                                                <label className="col-sm-3 control-label">xl :</label>
                                                <div className="col-sm-5">
                                                    <input className="form-control" name="xl" type="text"
                                                        value={this.state.xl} onChange={this.handleChange} placeholder="Enter Xl" />
                                                </div>
                                            </div>

                                            {/* ค่า xr */}
                                            <div className="form-group">
                                                <label className="col-sm-3 control-label">xr :</label>
                                                <div className="col-sm-5">
                                                    <input className="form-control" name="xr" type="text"
                                                        value={this.state.xr} onChange={this.handleChange} placeholder="Enter Xr" />
                                                </div>
                                            </div>


                                            <div className="form-group">
                                                <div className="col-sm-11 control-label" style={{ textAlign: "center" }}>
                                                    <button type="submit" value="Submit" className="btn btn-info">Submit</button>&nbsp;
                                                    <button className="btn btn-danger " onClick={this.clear}>  Reset  </button>
                                                </div>
                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </div>
                            {(this.state.submitted)
                            ? <div></div>
                            : <div>
                            <div className="col-md-7">
                                <div>
                                    <div className="box box-success">
                                        <div className="box-header with-border">
                                            <h2 >Chart</h2>
                                        </div>
                                        {/* โชว์กราฟ */}
                                        <div>
                                            <div className="box-body" >
                                                <div>
                                                    <Plot
                                                        data={[
                                                            {
                                                                x:X,
                                                                y:Y,
                                                                type:'scatter'
                                                            }
                                                        ]}
                                                        latout={{width:500,height:300,title:'Error'}}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            
                                 <section className="content">
                                    <div>
                                        <div className="row" id="T">
                                            <div className="col-md-12">
                                                <div className="box box-warning">
                                                    <div className="box-header">
                                                        <br />

                                                        <h2>Output</h2>

                                                    </div>
                                                    <div className="box-body table-responsive no-padding">
                                                        <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>n</th>
                                                                    <th>Xl</th>
                                                                    <th>Xr</th>
                                                                    <th>Xm</th>
                                                                    <th>func(Xl)</th>
                                                                    <th>func(Xr)</th>
                                                                    <th>func(Xm)</th>
                                                                    <th>ERR</th>
                                                                    
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {rows}
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </section>
                                </div>
                            }


                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
