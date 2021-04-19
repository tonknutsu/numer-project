import React, { Component } from 'react'
import axios from 'axios';
import Plot from 'react-plotly.js';
import * as math from 'mathjs';


var X,Y, xNew ,error ;
export default class Newton extends Component {

constructor(props){
    super(props);
    this.state={Arr:[],x:"",E:"",E2:"",submitted:true};
    X=[];
    Y=[];
    xNew = [];
    error = [];

    this.clear=this.clear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.NewtonRaphsonMethod=this.NewtonRaphsonMethod.bind(this);
  }

  clear(event){
    event.preventDefault();
    this.setState({Arr:[] , xNew: [] ,error: [] });
    this.setState({x:""});
    this.setState({E:"",E2:""});
    this.setState({submitted:true});
  }

  handleSubmit(event) {
    let str=this.state.E;
    let str2=this.state.E2;
    let c=0;
    for(let i=0;i<str.length;i++){
      if(str[i]==="x"||str[i]==="X"||str2[i]==="x"||str2[i]==="X"){
        c++;
      }
    }
    if((str.length !== 0 ) && (str2.length !== 0 ) && (c !== 0 ) && this.state.submitted && this.state.x !== ""){
      this.NewtonRaphsonMethod();
      this.setState({submitted:false});
    }
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
    this.setState({submitted:true});
    this.setState({Arr:[]});
  }

  NewtonRaphsonMethod(event){
    X = [];
    Y = [];
    xNew = [];
    error = [];

      var func=(x)=>{
          let scope={x:x}
          let code=math.compile(this.state.E);
          return code.eval(scope);
      };
      var func2=(x)=>{
          let scope={x:x}
          let code=math.compile(this.state.E2);
          return code.eval(scope);
      };

      var err=(x0,x1)=>{
        console.log("x1 is "+x1);
        console.log("x0 is "+x0);
        return Math.abs((x1-x0)/x1)*100};
      var arr;
      var data={x:0,err:"",fx:0,count:1};
      var t=true;
      var xOld=parseFloat(this.state.x);
      while(t){

        data.x=xOld-(func(xOld)/func2(xOld));
        data.fx=func(data.x);
        data.err=err(xOld,data.x).toFixed(6);
        arr=this.state.Arr;

        if(data.err <= 0 || data.count > 15){
          t = false;
        }else {
          arr.push({x:data.x,err:data.err,count:data.count});
        }
        data.count++;
        xOld=data.x;

        
      /* จัดการข้อมูลให้อยู่ใน Format Array และ เพิ่มค่าเข้าไปในตัวแปร จนครบวูป*/
      /*show Chart */
      X.push(data.count);
      Y.push(data.err);

      xNew.push(data.x);
      error.push(data.err);
   
    }
 
    /*API Insert into Database MongoDB */
    const newtonInsert = {
      E: this.state.E,
      E2: this.state.E2,
      x: this.state.x,
      xNew: xNew,
      error: error

    };
    console.log(newtonInsert);
  
    axios.post('http://localhost:5000/newton/add', newtonInsert)
    .then(res => { 
      console.log(res.data)
    })
    .catch(error => {
        console.log(error)
    });
}
  
  render() {
    const DataRow=(props)=>{return (<tr><td>{props.data.count}</td>
                                        <td>{props.data.x}</td>
                                        <td>{props.data.err}</td>
                                        </tr>);
                                        }
    let rows=this.state.Arr.map(x =>{return <DataRow key={x.count} data={x}/>});
        return (
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <h2><b>Newton's Method</b></h2>
                </section>


                {/* Main content */}
                <section className="content">
                    <div className="row">
                       
                            {/* Horizontal Form */}
                            <div className="col-sm-5" >

                                <div className="box box-info">

                                    <div className="box-header with-border">
                                        <h2 >Input</h2>
                                    </div>
                                    {/* /.box-header */}
                                    {/* form start */}


                                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                                        <div className="box-body">
                                            {/* .ใส่โจทย์ */}
                                            <div className="form-group">
                                                <label className="col-sm-3 control-label">Equation :</label>
                                                <div className="col-sm-5">
                                                    <input className="form-control" name="E" type="text" value={this.state.E}
                                                        onChange={this.handleChange} placeholder="Enter Equation" />
                                                </div>
                                            </div>

                                            {/* ค่า F'(x) */}
                                            <div className="form-group">
                                                <label className="col-sm-3 control-label">F'(x) :</label>
                                                <div className="col-sm-5">
                                                    <input className="form-control" name="E2" type="text"
                                                        value={this.state.E2} onChange={this.handleChange} placeholder="Enter F'(x)" />
                                                </div>
                                            </div>

                                            {/* ค่า x0 */}
                                            <div className="form-group">
                                                <label className="col-sm-3 control-label">x0 :</label>
                                                <div className="col-sm-5">
                                                    <input className="form-control" name="x" type="text"
                                                        value={this.state.x} onChange={this.handleChange} placeholder="Enter X0" />
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
                                                                    <th>X</th>
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
                </section>
            </div>
        )
    }
}
