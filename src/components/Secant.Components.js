import React, { Component } from 'react'
import Plot from 'react-plotly.js';
import axios from 'axios';
import * as math from 'mathjs';


var X , Y, XN ,error ;
export default class Secant extends Component {

    constructor(props){
        super(props);
        this.state={Arr:[],x0:"",x1:"",E:"",submitted:true};
        X=[];
        Y=[];
        XN =[] ;
        error = [];
     

        this.clear = this.clear.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.SecantMethod = this.SecantMethod.bind(this);
      }
      clear(event){
       
        this.setState({ Arr: [] });
        this.setState({ x0: "" });
        this.setState({ x1: "" });
        this.setState({ E: "" });
        this.setState({ submitted:true });


        event.preventDefault();
      }
      handleSubmit(event) {
        let str=this.state.E;
        let c=0;
        for(let i=0;i<str.length;i++){
          if(str[i]==="x"||str[i]==="X"){
            c++;
          }
        }
        if((str.length!==0)&&(c!==0)&&this.state.submitted&&this.state.x0!==""&&this.state.x1!==""){
          this.SecantMethod();
          this.setState({submitted:false});
        }
        event.preventDefault();
      }
      handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
        this.setState({submitted:true});
        this.setState({Arr:[]});
      }
      SecantMethod(event){
        X = [];
        Y = [];
        XN =[] ;
        error = [];
 

          var func=(x)=>{
              let scope={x:x}
              let code=math.compile(this.state.E);
              return code.eval(scope).toFixed(6);
          };
          var err=(x0,x1)=>{return Math.abs((x1-x0)/x1)*100};
          var arr;
          var data={x0:0,x1:0,xn:0,err:"",fx0:0,fx1:0,fxn:0,count:1};
          var t=true;
          data.x0=parseFloat(this.state.x0);
          data.x1=parseFloat(this.state.x1);
          var xOld=data.x1;
          while(t){
            data.fx0=func(data.x0);
            data.fx1=func(data.x1);
            data.xn=parseFloat(data.x1-((data.fx1*(data.x0-data.x1))/(data.fx0-data.fx1)));
            data.fxn=func(data.xn);
            data.err=err(xOld,data.xn);
            arr=this.state.Arr;
            arr.push({x0:data.x0,x1:data.x1,xn:data.xn,err:data.err,fx0:data.fx0,fx1:data.fx1,fxn:data.fxn,count:data.count});
            if(data.err===0||data.count>15){
              t=false;
            }
            data.count++;
            xOld=data.xn;
            data.x0=data.x1;
            data.x1=data.xn;

            /* จัดการข้อมูลให้อยู่ใน Format Array และ เพิ่มค่าเข้าไปในตัวแปร จนครบวูป*/
            /*show Chart */
            X.push(data.count);
            Y.push(data.err);

            XN.push(data.xn);
            error.push(data.err);
        
            }
        
            /*API Insert into Database MongoDB */
            const secantInsert = {
            E: this.state.E,
            x0: this.state.x0,
            x1: this.state.x1,
            xn: XN,
            error: error
            };
            console.log(secantInsert);
        
            axios.post('http://localhost:5000/secant/add', secantInsert)
            .then(res => { 
            console.log(res.data)
            })
            .catch(error => {
                console.log(error)
            });
        }
      render() {
        const DataRow=(props)=>{return (<tr><td>{props.data.count}</td>
                                            <td>{props.data.x0}</td>
                                            <td>{props.data.x1}</td>
                                            <td>{props.data.xn}</td>
                                            <td>{props.data.err}%</td>
                                            </tr>);
                                            }
        let rows=this.state.Arr.map(x =>{return <DataRow key={x.count} data={x}/>});
        return (
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h2><b>Secant Method</b></h2>
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

                                            {/* ค่า x0 */}
                                            <div className="form-group ">
                                                <label className="col-sm-3 control-label">x0 :</label>
                                                <div className="col-sm-5">
                                                    <input className="form-control" name="x0" type="text"
                                                        value={this.state.x0} onChange={this.handleChange} placeholder="Enter X0" />
                                                </div>
                                            </div>

                                            {/* ค่า x1 */}
                                            <div className="form-group">
                                                <label className="col-sm-3 control-label">x1 :</label>
                                                <div className="col-sm-5">
                                                    <input className="form-control" name="x1" type="text"
                                                        value={this.state.x1} onChange={this.handleChange} placeholder="Enter X1" />
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
                            ?<div></div>
                            :<div>
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
                                                                x: X,
                                                                y: Y,
                                                                type: 'scatter'
                                                            }
                                                        ]}
                                                        latout={{ width: 500, height: 300, title: 'Error' }}
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
                                                                <tr><th>Iteration</th>
                                                                    <th>X0</th>
                                                                    <th>X1</th>
                                                                    <th>x</th>
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
        )
    }
}

