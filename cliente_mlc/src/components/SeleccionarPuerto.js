import React, {Component} from 'react';

import {FormattedMessage} from 'react-intl';

//redux
import { connect } from 'react-redux';
import { getPuertos } from '../actions/puertoActions';
import { getParametros } from '../actions/puertoActions';
import { getTipoNave } from '../actions/naveActions';
import { getNaveByOMI} from '../actions/naveActions';
import {todayPlusDays} from './comun/Utils';


class SeleccionarPuerto extends Component{
    
    
    state={
        tomorrow:todayPlusDays(0),
        puerto:'0',
        fecha:'',
        omi:'',
        error:'',
        isLoading:false,
        isSubmiting:false
    }
    
    componentDidMount(){
        const {isLoading}=this.state;
        if(!isLoading){
            //console.log(this.state);
            this.setState({ isLoading: true }, () => {
                this.props.getPuertos().then(respuesta=>{ 
                    //const {isLoading}=this.state;
                    //console.log(this.state);
                    this.setState({isLoading:false,error:''})}).catch((err) => 
                    {  this.setState({error:this.props.lenguaje.messages.errorConexionAPI,
                                        isLoading:false})  });
              }); 
              
              this.setState({ isLoading: true }, () => {
                this.props.getTipoNave().then(respuesta=>{ 
                    //const {isLoading}=this.state;
                    //console.log(this.state);
                    this.setState({isLoading:false,error:''})}).catch((err) => 
                    {  this.setState({error:this.props.lenguaje.messages.errorConexionAPI,
                                        isLoading:false})  });
              }); 

              this.setState({ isLoading: true }, () => {
                this.props.getParametros().then(respuesta=>{ 
                    //const {isLoading}=this.state;
                    //console.log(this.state);
                    this.setState({isLoading:false,error:''})}).catch((err) => 
                    {  this.setState({error:this.props.lenguaje.messages.errorConexionAPI,
                                        isLoading:false})  });
              }); 
            
        }
        const estadoLS=localStorage.getItem('estadoSeleccionarPuerto');
        if(estadoLS)
            this.setState(JSON.parse(estadoLS));
        this.setState({tomorrow:todayPlusDays(0)});
    }
    
    componentDidUpdate(){
        localStorage.setItem('estadoSeleccionarPuerto',JSON.stringify(this.state));
    }
          
    setPuerto=e=>{
        this.setState({puerto:e.target.value})
    }

    setFecha=e=>{
        this.setState({fecha:e.target.value})
    }
    setOMI=e=>{
        this.setState({omi:e.target.value})
    }

    


    atras=()=>{
        this.props.history.push('/');
    }
     
    siguiente=()=>{
        //console.log(this.state);
        //this.setState({error:''});
        const {puerto,omi,fecha,tomorrow}=this.state;
       
        if(puerto==='0' || fecha===''){
            this.setState({error:this.props.lenguaje.messages.faltanCampos});
            return;
        }else{
            if(omi===''){
                    this.setState({error:this.props.lenguaje.messages.mensajeOMIVacio});
                    return;
                }else{
                    if(omi.length>'7'){
                        this.setState({error:this.props.lenguaje.messages.errorLongitudOMI});
                        return;
                    }
                }
        }
        if(fecha<tomorrow){
            this.setState({error:this.props.lenguaje.messages.errorFechaRecalada+' '+tomorrow});
            return;
        }


        this.setState({ error:'', isLoading: true }, () => {
            this.props.getNaveByOMI(this.state.omi).then(response=>
            {

                        if(this.props.nave.nave)
                        {
                            //console.log(this.props.tiposNaves);
                            //console.log(this.props.nave.nave);
                            var posTipoNave=this.props.tiposNaves.findIndex(item => item.id === this.props.nave.nave.clase.codigo);
                            if(posTipoNave!==-1){
                                if(this.props.tiposNaves[posTipoNave].considerarMLC===true){
                                    //console.log(parseInt(this.props.nave.nave.arqueoBruto));
                                    //console.log(parseInt(this.props.parametros.parametros.pesajeNaveMLC));
                                    if(parseInt(this.props.nave.nave.arqueoBruto)>=this.props.parametros.parametros.pesajeNaveMLC)
                                    {
                                        //console.log(parseInt(this.props.nave.nave.arqueoBruto));
                                        if(this.props.nave.nave.viajesInternacionales===1)
                                        {
                                            //console.log(this.props.nave.nave.viajesInternacionales);
                                            //this.props.parametrosIniciales.OMI_inicial=omi;
                                                this.props.history.push({
                                                    pathname: '/mlc',
                                                    state: {
                                                    'puerto': this.state.puerto,
                                                    'fecha':  this.state.fecha,
                                                    'nave': this.props.nave.nave,
                                                    'tipoNave':this.props.tiposNaves[posTipoNave].glosa,
                                                    'tipoNaveIngles':this.props.tiposNaves[posTipoNave].glosaIngles,
                                                    }
                                                });
                                        }else
                                            this.setState({error:this.props.lenguaje.messages.errorViajesInternaionales});
                                    }else
                                        this.setState({error:this.props.lenguaje.messages.errorPesaje+' '+this.props.parametros.parametros.pesajeNaveMLC+' trg'});
                                }else
                                    this.setState({error:this.props.lenguaje.messages.errorTipoNave});
                            }else
                                this.setState({error:this.props.lenguaje.messages.errorTipoNave});
                              
                        }
                        else
                        {
                            console.log(this.props.lenguaje.messages.mensajeOMINOEncontrado);
                            this.setState({error:this.props.lenguaje.messages.mensajeOMINOEncontrado});
                        }
                        this.setState({isLoading:false})
            }).catch(err => {  this.setState({error:this.props.lenguaje.messages.errorConexionAPI,isLoading:false})  })
        });
       
        
      }
    
    render(){
        //console.log(this.state.tomorrow);
        const {puerto,fecha,omi}=this.state;
        const{error,isLoading}=this.state;
        const {puertos}=this.props;
        return(
            <React.Fragment>
                     <div className="row">
                        <div className="col-md-8">
                            <p className="text-justify"> <FormattedMessage id="leyenda" defaultMessage="" /></p>
                        </div>
                      </div>
                     <div className="row">
                        <div className="col-md-8">
                            <h4><FormattedMessage id="seleccionarPuerto" defaultMessage="" /></h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <label><FormattedMessage id="puertoRecalada" defaultMessage="" /></label>
                        </div>
                        
                        <div className="col-md-4 ">
                            <select value={puerto} className="form-control" onChange={this.setPuerto}>
                            <option value="0">{this.props.lenguaje.messages.seleccionar}</option>
                                {puertos.map((puerto) => <option key={puerto.id} value={puerto.id}>{puerto.nombre}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <label><FormattedMessage id="nroOMI" defaultMessage="Nro OMI" /></label>
                        </div>
                        <div className="col-md-4">
                            <input value={omi} onChange={this.setOMI}  type="number" className="form-control" />
                        </div>
                    </div>  
                    
                    <div className="row">
                        <div className="col-md-4">
                            <label><FormattedMessage id="fechaRecalada" defaultMessage="" /></label>
                        </div>
                        <div className="col-md-4">
                             <input value={fecha} onChange={this.setFecha} type="date"  min={this.state.tomorrow} className="form-control" />
                        </div>
                    </div>

                    <div className="row">
                    &nbsp;
                    </div>
                        {error.length>0 ? 
                            <div className="col-md-8 alert alert-danger">
                                        {error}
                            </div>:''
                        }
                    <div className="row">
                            
                            <div className="col-md-6">
                                    &nbsp;
                            {/*    <button onClick={this.atras} type="button" className="col-md-4 btn btn-secondary">
                                &laquo; Atras</button>
                                */}
                            </div>
                            <br></br>
                            <div className="col-md-6">
                            <button onClick={this.siguiente} type="button" disabled={this.state.isLoading} className="col-md-4 btn btn-primary">
                                { !isLoading ?
                                    <span >
                                         <FormattedMessage id="botonSiguiente" defaultMessage="" /> &raquo;
                                    </span>
                                        :
                                    <span >
                                        <FormattedMessage id="botonSiguiente" defaultMessage="" /> &nbsp; 
                                    <span className="fa fa-circle-o-notch fa-spin"></span>
                                    </span>
    
                                }
                                
                
                            </button>
                            </div>
                    </div>
                   
                    
            </React.Fragment>
           
        );
    }
}
const mapStateToProps = state=>({
    parametros:state.dataPuertos.parametros,
    puertos:state.dataPuertos.puertos,
    tiposNaves:state.dataPuertos.tiposNaves,
    nave:state.dataPuertos.nave,
    lenguaje:state.intl
})
export default connect(mapStateToProps,{getParametros,getPuertos,getNaveByOMI,getTipoNave})(SeleccionarPuerto);