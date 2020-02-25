import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
//redux
import { connect } from 'react-redux';
import { getPuertos } from '../actions/puertoActions';
import { getNaveByOMI} from '../actions/naveActions';
import { registrarQueja } from '../actions/quejaActions';
import { getNacionalidad } from '../actions/personaActions';

import DatosPersona from './DatosPersona';
import DatosEmbarcacion from './DatosEmbarcacion';
import DatosColocacion from './DatosColocacion';
import DatosArmador from './DatosArmador';
import DatosQueja from './DatosQueja';



class LlenarQueja extends Component{
    constructor(props) {
        super(props);
        this.state={
            idPuertoRecalada:'',
            fechaRecalada:'',
            OMI:'',
            idNave:'',
    
            nacionalidadChilena:'',
            nacionalidad:'',
            rutCompleto:'',
            rut:'',
            dv:'',
            pasaporte:'',
            paisPasaporte:'0',
            nombres:'',
            apellidoPaterno:'',
            apellidoMaterno:'',
            sexo:'0',
            fechaNacimiento:'',
            correoElectronico:'',
            puestoTrabajo:'0',
    
            seleccion: 'colocacion',
    
            rutContratacion:'',
            razonSocialContratacion:'',
            domicilioContratacion:'',
            paisContratacion:'0',
    
            nacionalidadArmador:'',    
            rutArmador:'',
            nombreArmador:'',
            domicilioArmador:'',
    
            //matricula:'',
            idTipoNavegacion:'',
            tipoNavegacion:'',
            //actividadBuque:'',
            nombreCapitan:'',
            nacionalidadCapitan:'0',
            bandera:'',
            fechaEmbarco:'',
            fechaDesembarco:'',
            //estadoPabellon:'',
    
            materiaQueja:[],
            descripcionQueja:'',
            
            isLoading:false,
            isSubmiting:false,
            //error:'',
            errores:[],
            validarCampos:false,
            
            erroresDatosPersona:null,
            erroresDatosColocacion:null,
            erroresDatosArmador:null,
            erroresDatosEmbarcacion:null,
            erroresDatosQueja:null
    
        }
      }
    
    

   
    rutOnBlur=e=>{
        var rutCompleto=e.target.value;
        if(rutCompleto.indexOf('-')!==-1){
            this.setState({rutValido:true});
            var rut=rutCompleto.substr(0,rutCompleto.length-2);
            var dv=rutCompleto.substr(rutCompleto.length -1, 1);
            this.getDatosPersona(rut,dv);
        }else{
            this.limpiarCamposBasicos();
            this.setState({rutValido:false, errorRut:'RUT inválido'});
        }
    }
    
   

    componentDidMount(){
        const {nacionalidadChilena}=this.props;
        this.setState({nacionalidadChilena:nacionalidadChilena,nacionalidad:nacionalidadChilena,nacionalidadArmador:nacionalidadChilena});
        this.props.getNacionalidad().then(respuesta=>{ this.setState({error:''})}).catch((err) => {  this.setState({error:this.props.lenguaje.messages.errorConexionAPI})  });
        //console.log(this.props.location);
        //console.log(this.props.lenguaje);
        //console.log(this.props.location.state.nave.clase);
        //const {state} = this.props.location;
        this.setState({
            idPuertoRecalada:this.props.location.state.puerto,
            fechaRecalada:this.props.location.state.fecha,
            idTipoNavegacion:this.props.location.state.nave.clase.codigo,
            tipoNavegacion:this.props.lenguaje.locale==='es' ? this.props.location.state.tipoNave : this.props.location.state.tipoNaveIngles,
            bandera:this.props.location.state.nave.codigoBandera,
            idNave:this.props.location.state.nave.id,
            OMI:this.props.location.state.nave.numeroIMO    });
    }
    
       

    setCampo=(campo,valor)=>{
    // console.log(this.state);
        this.setState({
            [campo]: valor,
          });
    }

    setOption=e=>{
        //console.log(e.target.name);
        //this.props.setCampo(e);
        this.setState({
            seleccion: e.target.value
          });

}
   


    atras=()=>{
    this.props.history.push('/');
    }
    siguiente=()=>{
        this.setState({validarCampos:true,errores:[]},()=>{
            var errores=[];
            var errorEnCamposDatosPersona=Object.values(this.state.erroresDatosPersona).findIndex(item => item === true)!==-1;
            if(errorEnCamposDatosPersona && Object.values(this.state.erroresDatosPersona)[Object.values(this.state.erroresDatosPersona).length-1]!=='')
                errores.push(Object.values(this.state.erroresDatosPersona)[Object.values(this.state.erroresDatosPersona).length-1]);

            var errorEnCampos=errorEnCamposDatosPersona;
           
            /*
            if(this.state.seleccion==='colocacion')
                errorEnCampos=errorEnCampos || Object.values(this.state.erroresDatosColocacion).findIndex(item => item === true)!==-1;
            else
                errorEnCampos=errorEnCampos || Object.values(this.state.erroresDatosArmador).findIndex(item => item === true)!==-1;
            */
            //console.log(Object.values(this.state.erroresDatosColocacion));

            var errorEnCamposEmbarcacion=(Object.values(this.state.erroresDatosEmbarcacion).findIndex(item => item === true)!==-1);
            
            if(errorEnCamposEmbarcacion && Object.values(this.state.erroresDatosEmbarcacion)[Object.values(this.state.erroresDatosEmbarcacion).length-1]!=='')
             errores.push(Object.values(this.state.erroresDatosEmbarcacion)[Object.values(this.state.erroresDatosEmbarcacion).length-1]);
               //errores.push(Object.values(this.state.erroresDatosEmbarcacion)[Object.values(this.state.erroresDatosEmbarcacion).length-1]);
            
            //console.log(errores);            

            errorEnCampos= errorEnCampos || errorEnCamposEmbarcacion;
            //console.log(faltanCampos);
            
            errorEnCampos=errorEnCampos || (Object.values(this.state.erroresDatosQueja).findIndex(item => item === true)!==-1);
            
            //console.log(errores);
            
            if(errorEnCampos)
            {
                if(errores.length===0)
                   this.setState({errores: this.state.errores.concat(this.props.lenguaje.messages.faltanCampos)});
                else   
                    this.setState({errores: errores});
            }
            else{
                    this.setState({isSubmiting:true}); 
                    var infoQueja={
                        idNacionalidadChilena:this.state.nacionalidadChilena,
                        idPuertoRecalada:this.state.idPuertoRecalada,
                        fechaRecalada:this.state.fechaRecalada,
                        OMI:this.state.OMI,
                        idNave:this.state.idNave,
                        idNacionalidad:this.state.nacionalidad,
                        rut:this.state.rut,
                        dv:this.state.dv,
                        pasaporte:this.state.pasaporte,
                        idPaisPasaporte:this.state.paisPasaporte,
                        nombres:this.state.nombres,
                        apellidoPaterno:this.state.apellidoPaterno,
                        apellidoMaterno:this.state.apellidoMaterno,
                        idSexo:this.state.sexo,
                        fechaNacimiento:this.state.fechaNacimiento,
                        email:this.state.correoElectronico,
                        puestoTrabajo:this.state.puestoTrabajo,
                        tipoEmpleador:this.state.seleccion,
                        rutEmpleador: this.state.seleccion==='colocacion' ? this.state.rutContratacion: this.state.rutArmador,
                        razonSocialEmpleador:this.state.seleccion==='colocacion' ? this.state.razonSocialContratacion : this.state.nombreArmador,
                        direccionEmpleador:this.state.seleccion==='colocacion' ? this.state.domicilioContratacion : this.state.domicilioArmador,
                        idPaisEmpleador:this.state.seleccion==='colocacion' ? this.state.paisContratacion : this.state.nacionalidadArmador,
                        idTipoNave:this.state.idTipoNavegacion,
                        glosaTipoNave:this.state.tipoNavegacion,
                        nombreCapitan:this.state.nombreCapitan,
                        idPaisCapitan:this.state.nacionalidadCapitan,
                        bandera:this.state.bandera,
                        fechaEmbarco:this.state.fechaEmbarco,
                        fechaDesembarco:this.state.fechaDesembarco,
                        idMateriaQueja:[],
                        descripcionQueja:this.state.descripcionQueja,
                        lenguaje:this.props.lenguaje.locale
                    }
                    //console.log(infoQueja);
                    this.state.materiaQueja.map(function(item){
                        infoQueja.idMateriaQueja.push(item.value);
                    })

                    this.props.registrarQueja(infoQueja).then(response=>
                    {
                            this.setState({isSubmiting:false});    
                            //console.log(this.props.respuestaRegistroQueja);
                            if(this.props.respuestaRegistroQueja.estado!==0)
                                this.setState({errores: this.state.errores.concat(this.props.respuestaRegistroQueja.mensaje)});
                            else
                                {
                                    this.props.history.push({
                                        pathname: '/fin',
                                        state: {
                                          'idQueja': this.props.respuestaRegistroQueja.mensaje
                                        }
                                      });
                                }                                

                    }).catch((err) => {  this.setState({errores: this.state.errores.concat(this.props.lenguaje.messages.errorConexionAPI)})  });
                
                }
        });
    }

    
    render(){
        const{errores}=this.state;
        var erroresComponents = this.state.errores.map(function(error,index) {
                return <li key={index}>{error}</li>;
        });
        //console.log(this.state.errores);
        //const {puertos}=this.props;
        return(
            <React.Fragment>
                    
                    <DatosPersona setCampo={this.setCampo} datos={this.state}/>
                    
                    <div className="row">
                            <div className="col-md-4">
                                <h4><FormattedMessage id="tituloColocacion" defaultMessage="" /></h4>
                            </div>
                    
                            <div className="col-md-4 form-inline">
                                <label className="radio radio-inline">
                                        <input
                                        type="radio"
                                        value="colocacion"
                                        checked={this.state.seleccion === "colocacion"}
                                        onChange={this.setOption}
                                        />
                                        <FormattedMessage id="selectColocacion" defaultMessage="" />
                                </label>
                                <label>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                <label className="radio radio-inline">
                                       <input
                                        type="radio"
                                        value="armador"
                                        checked={this.state.seleccion === "armador"}
                                        onChange={this.setOption}
                                        />
                                        <FormattedMessage id="selectArmador" defaultMessage="" />
                                 </label>
                            </div>
                    </div>  
                    { this.state.seleccion==='colocacion'?
                        <DatosColocacion setCampo={this.setCampo} datos={this.state}/>
                        :
                        <DatosArmador setCampo={this.setCampo} datos={this.state}/>
                    } 
                    
                    <DatosEmbarcacion setCampo={this.setCampo} datos={this.state}/>
                    <DatosQueja setCampo={this.setCampo} datos={this.state}/>


                    <div className="row">
                        &nbsp;
                    </div>
                    {errores.length>0 ? <div className="col-md-8 alert alert-danger">
                    {erroresComponents}
                    </div>
                    :''
                    }                 
                    <div className="row">
                        <div className="col-md-6">
                                <button onClick={this.atras} type="button" disabled={this.state.isLoading} className="col-md-4 btn btn-secondary">
                                &laquo; <FormattedMessage id="botonAtras" defaultMessage="" /></button>
                            </div>
                            <br></br>
                            <div className="col-md-6">
                            <button onClick={this.siguiente} type="button" disabled={this.state.isLoading} className="col-md-4 btn btn-primary">
                                { !this.state.isSubmiting ?
                                    <span >
                                        <FormattedMessage id="botonGuardar" defaultMessage="" /> 
                                    </span>
                                        :
                                    <span >
                                        <FormattedMessage id="botonGuardar" defaultMessage="" /> &nbsp; 
                                    <span className="fa fa-circle-o-notch fa-spin"></span>
                                    </span>
    
                                }
                                
                
                            </button>
                            </div>
                                {/*
                            <div className="col-md-6">
                                <button onClick={this.atras} type="button" className="col-md-4">Atras</button>
                            </div>
                            <div className="col-md-6">
                            <button onClick={this.siguiente} type="button" className="col-md-4">Siguiente</button>
                            </div>
                            */}
                    </div>

                   
            </React.Fragment>
           
        );
    }
}
const mapStateToProps = state=>{
    //console.log("mapStateToProps: ", state);
    //console.log(state.location.state.hello);
    
    return {
    nacionalidadChilena:state.parametrosIniciales.nacionalidadChilena,
    respuestaRegistroQueja: state.queja.respuesta,
    lenguaje:state.intl
    }
}

export default connect(mapStateToProps,{getNacionalidad,getPuertos,getNaveByOMI,registrarQueja})(LlenarQueja);