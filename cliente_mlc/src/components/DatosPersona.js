import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
//redux
import { connect } from 'react-redux';
import { getSexo } from '../actions/personaActions';
import { getNacionalidad } from '../actions/personaActions';
import { getDatosPersona } from '../actions/personaActions';
import { getPuestosTrabajo } from '../actions/mantenedorActions';

import {todayPlusDays, validaEmail} from './comun/Utils';
class DatosPersona extends Component{
    
    state={ 
        fechaActual:todayPlusDays(-1),
        camposHabilitados:true,
        rutValido:true,
        errorRut:'',
        errorEmail:'',
        consultandoRut:false
     }
    
     errors= {
        nacionalidad: false,
        rut:false,
        pasaporte:false,
        paisPasaporte:false,
        nombres:false,
        apellidoPaterno:false,
        apellidoMaterno:false,
        sexo:false,
        fechaNacimiento:false,
        puestoTrabajo:false,
        correoElectronico:false
    }

    setCampo=e=>{
        //console.log(e.target.name);
        this.setState({ [e.target.name]: e.target.value });
        this.props.setCampo(e.target.name,e.target.value);
    }
    
    

    componentDidMount(){
        this.props.getSexo().then(respuesta=>{ this.setState({error:''})}).catch((err) => {  this.setState({error:this.props.lenguaje.messages.errorConexionAPI})  });
        this.props.getNacionalidad().then(respuesta=>{ this.setState({error:''})}).catch((err) => {  this.setState({error:this.props.lenguaje.messages.errorConexionAPI})  });
        this.props.getPuestosTrabajo().then(respuesta=>{ this.setState({error:''})}).catch((err) => {  this.setState({error:this.props.lenguaje.messages.errorConexionAPI})  });
    }

    cambioNacionalidad=e=>{
        this.props.setCampo(e.target.name,e.target.value);
        this.setState({ 
            camposHabilitados: (e.target.value===this.props.datos.nacionalidadChilena ? true : false)});
        this.limpiarCamposBasicos();
      
    }

    rutOnBlur=e=>{
        var rutCompleto=e.target.value;
        var esValido=false;
        this.setState({consultandoRut:true})
        if(rutCompleto.indexOf('-')!==-1){
            this.setState({rutValido:true});
            var rut=rutCompleto.substr(0,rutCompleto.length-2);
            var dv=rutCompleto.substr(rutCompleto.length -1, 1);
            if(!isNaN(rut)){
                this.props.datos.rut=rut;
                this.props.datos.dv=dv;
                this.getDatosPersona(rut,dv);
                esValido=true;
            }
        }
        if(!esValido){
            this.limpiarCamposBasicos();
            this.setState({rutValido:false, errorRut:this.props.lenguaje.messages.errorRutValido,consultandoRut:false});
        }
    }
    
    pasaporteOnBlur=e=>{
        var pasaporte=e.target.value;
        this.setState({consultandoRut:true})
        this.getDatosPersona(0,'_',pasaporte);
        
    }


    emailOnBlur=e=>{
        var email=e.target.value;
        if(!validaEmail(email))
            this.setState({errorEmail:this.props.lenguaje.messages.errorEmailNoValido});
        else
            this.setState({errorEmail:''});
    }

    limpiarCamposBasicos=()=>{
        this.props.setCampo('nombres','');
        this.props.setCampo('apellidoPaterno','');
        this.props.setCampo('apellidoMaterno','');
        this.props.setCampo('sexo','0');
        this.props.setCampo('fechaNacimiento','');
        this.props.setCampo('correoElectronico','');
    }
    getDatosPersona=(rut,dv,pasaporte)=>{
        this.props.getDatosPersona(rut,dv,pasaporte).then(response=>
            {
                        //console.log(response);
                        this.setState({error:''})
                        if(this.props.persona.estado===0){
                            //console.log(this.props.persona.personaDetalle);
                            this.props.setCampo('nombres',this.props.persona.personaDetalle.nombres);
                            this.props.setCampo('apellidoPaterno',this.props.persona.personaDetalle.apellidoPaterno);
                            this.props.setCampo('apellidoMaterno',(this.props.persona.personaDetalle.apellidoMaterno===null)?'':this.props.persona.personaDetalle.apellidoMaterno);
                            this.props.setCampo('sexo',this.props.persona.personaDetalle.idSexo);
                            this.props.setCampo('fechaNacimiento',this.props.persona.personaDetalle.fechaNacimiento.substr(0,10));
                            this.props.setCampo('correoElectronico', (this.props.persona.personaDetalle.email==null)?'':this.props.persona.personaDetalle.email);

                        }else{
                            this.limpiarCamposBasicos();
                            this.setState({rutValido:false, errorRut:this.props.persona.mensaje});
                        }
                        this.setState({consultandoRut:false});
                            
                      
            }).catch(err => {   //console.log(err);
                this.setState({error:'Error de conexion',consultandoRut:false})  })
    }

    validate=(validarCampos,nacionalidad,rutCompleto,pasaporte,paisPasaporte,nombres,apellidoPaterno,sexo,fechaNacimiento,puestoTrabajo,correoElectronico)=> {
        // true means invalid, so our conditions got reversed
        //console.log(pasaporte+' '+paisPasaporte+' '+nombres);
        var error='';
        if(fechaNacimiento>this.state.fechaActual)
            error=this.props.lenguaje.messages.errorFechaNacimiento;
        
        if(!validaEmail(correoElectronico))
            error=this.props.lenguaje.messages.errorEmailNoValido;

        return {
            nacionalidad: nacionalidad === '0' && validarCampos,
            rutCompleto: rutCompleto==='' && validarCampos  && nacionalidad===this.props.datos.nacionalidadChilena,
            pasaporte: pasaporte==='' && validarCampos && nacionalidad!==this.props.datos.nacionalidadChilena,
            paisPasaporte: paisPasaporte=== '0' && validarCampos && nacionalidad!==this.props.datos.nacionalidadChilena,
            nombres:nombres==='' && validarCampos  && nacionalidad!==this.props.datos.nacionalidadChilena,
            apellidoPaterno:apellidoPaterno==='' && validarCampos && nacionalidad!==this.props.datos.nacionalidadChilena,
            sexo:sexo==='0' && validarCampos && nacionalidad!==this.props.datos.nacionalidadChilena,
            fechaNacimiento:(fechaNacimiento==='' || error!=='') && validarCampos && nacionalidad!==this.props.datos.nacionalidadChilena,
            puestoTrabajo:puestoTrabajo==='0' && validarCampos,
            correoElectronico:correoElectronico==='' && validarCampos,
            error 
        };
      }
    render(){
        const {nacionalidades,sexos,lenguaje,puestosTrabajo}=this.props;
        const errors = this.validate(this.props.datos.validarCampos,this.props.datos.nacionalidad,
            this.props.datos.rutCompleto,
            this.props.datos.pasaporte, this.props.datos.paisPasaporte,this.props.datos.nombres,
            this.props.datos.apellidoPaterno,this.props.datos.sexo,
            this.props.datos.fechaNacimiento,this.props.datos.puestoTrabajo,
            this.props.datos.correoElectronico);
        
        this.props.datos.erroresDatosPersona=errors;
        //const {valorN}=this.getCampo;
        //console.log(this.props.lenguaje);
        return(
            <React.Fragment>
                    <div className="row">
                        <div className="col-md-12">
                        <h4><FormattedMessage id="tituloPersona" defaultMessage="" /></h4>
                        
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <label><FormattedMessage id="nacionalidad" defaultMessage="" /></label>
                        </div>
                        <div className={errors.nacionalidad ? "col-md-4 has-error" : "col-md-4"} >
                            <select  className="form-control" name="nacionalidad" value={this.props.datos.nacionalidad} onChange={this.cambioNacionalidad} >
                                <option value="0">{this.props.lenguaje.messages.seleccionar}</option>
                                {nacionalidades.map((nacionalidad) => <option key={nacionalidad.id} value={nacionalidad.id}>{ lenguaje.locale==='es' ? nacionalidad.gentilicio : nacionalidad.gentilicioIngles}</option>)}
                            </select>
                        </div>
                    </div>
                    {this.props.datos.nacionalidad===this.props.datos.nacionalidadChilena ? 
                         <React.Fragment>
                            <div className="row">
                                <div className="col-md-4">
                                    <label><FormattedMessage id="rut" defaultMessage="" /></label>
                                </div>
                                <div className={errors.rutCompleto ? "col-md-4 has-error" : "col-md-4"}>
                                    <input onChange={this.setCampo} onBlur={this.rutOnBlur} name="rutCompleto" type="text" className="form-control" />
                                </div>
                                { this.state.consultandoRut ?
                                    <span className="fa fa-circle-o-notch fa-spin"></span>
                                :''
                                }
                                { !this.state.rutValido ?
                                <i className="small glyphicon glyphicon-info-sign" style={{ color:'red' }} > {this.state.errorRut}</i>
                                :''
                                }
                                
                            </div>
                           
                        </React.Fragment>
                        :
                        <React.Fragment>
                           
                            <div className="row">
                                <div className="col-md-4">
                                    <label><FormattedMessage id="pasaporte" defaultMessage="" /></label>
                                </div>
                                <div className={errors.pasaporte ? "col-md-4 has-error" : "col-md-4"}>
                                    <input  name="pasaporte"  onBlur={this.pasaporteOnBlur} onChange={this.setCampo}   maxLength="20" type="text" className="form-control" />
                                </div>
                                { this.state.consultandoRut ?
                                    <span className="fa fa-circle-o-notch fa-spin"></span>
                                :''
                                }
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <label><FormattedMessage id="paisPasaporte" defaultMessage="" /></label>
                                </div>
                                <div className={errors.paisPasaporte ? "col-md-4 has-error" : "col-md-4"}>
                                    <select  className="form-control" value={this.props.datos.paisPasaporte} name="paisPasaporte" onChange={this.setCampo} >
                                        <option value="0">{ lenguaje.locale==='es' ? '--Seleccionar--' : '--Select--' }</option>
                                        {nacionalidades.map((nacionalidad) => <option key={nacionalidad.id} value={nacionalidad.id}>{ lenguaje.locale==='es' ? nacionalidad.glosaPais : nacionalidad.glosaPaisIngles}</option>)}
                                    </select>
                                </div>
                            </div>
                       </React.Fragment>
                    }
                    <div className="row">
                        <div className="col-md-4">
                            <label><FormattedMessage id="nombre" defaultMessage="" /></label>
                        </div>
                        <div className={errors.nombres ? "col-md-4 has-error" : "col-md-4"}>
                            <input value={this.props.datos.nombres} onChange={this.setCampo} disabled={this.state.camposHabilitados} name="nombres" maxLength="20" type="text" className="form-control" />
                        </div>
                    </div>

                    

                    <div className="row">
                        <div className="col-md-4">
                            <label><FormattedMessage id="apellidoPaterno" defaultMessage="" /></label>
                        </div>
                        <div className={errors.apellidoPaterno ? "col-md-4 has-error" : "col-md-4"}>
                            <input value={this.props.datos.apellidoPaterno} onChange={this.setCampo} disabled={this.state.camposHabilitados} name="apellidoPaterno" maxLength="20" type="text" className="form-control" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <label><FormattedMessage id="apellidoMaterno" defaultMessage="" /></label>
                        </div>
                        <div className="col-md-4">
                            <input value={this.props.datos.apellidoMaterno} onChange={this.setCampo} disabled={this.state.camposHabilitados} name="apellidoMaterno" maxLength="20" type="text" className="form-control" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <label><FormattedMessage id="sexo" defaultMessage="" /></label>
                        </div>
                        <div className={errors.sexo ? "col-md-4 has-error" : "col-md-4"}>
                            <select  value={this.props.datos.sexo} onChange={this.setCampo} name="sexo" className="form-control" disabled={this.state.camposHabilitados}>
                                {sexos.map((sexo) => <option key={sexo.id} value={sexo.id}>{ lenguaje.locale==='es' ? sexo.glosa : sexo.glosaIngles}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <label><FormattedMessage id="fechaNacimiento" defaultMessage="" /></label>
                        </div>
                        <div className={errors.fechaNacimiento ? "col-md-4 has-error" : "col-md-4"}>
                            <input value={this.props.datos.fechaNacimiento}  onChange={this.setCampo} disabled={this.state.camposHabilitados} 
                            max={this.state.fechaActual} name="fechaNacimiento" type="date" className="form-control"  />
                        </div>
                    </div>



                    <div className="row">
                        <div className="col-md-4">
                            <label><FormattedMessage id="correoElectronico" defaultMessage="" /></label>
                        </div>
                        <div className={errors.correoElectronico ? "col-md-4 has-error" : "col-md-4"}>
                             <input value={this.props.datos.correoElectronico} onBlur={this.emailOnBlur}  onChange={this.setCampo} name="correoElectronico" maxLength="50" type="text" className="form-control" />
                        </div>
                        <i className="small glyphicon glyphicon-info-sign" style={{ color:'red' }} > {this.state.errorEmail}</i>
                        
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <label><FormattedMessage id="puestoTrabajo" defaultMessage="" /></label>
                        </div>
                        <div className={errors.puestoTrabajo ? "col-md-4 has-error" : "col-md-4"}>
                            <select value={this.props.datos.puestoTrabajo} name="puestoTrabajo" className="form-control" onChange={this.setCampo}>
                                <option value="0">{this.props.lenguaje.messages.seleccionar}</option>
                                {puestosTrabajo.map((puesto) => <option key={puesto.id} value={puesto.id}>{ lenguaje.locale==='es' ? puesto.glosa : puesto.glosaIngles }</option>)}
                            </select>
                        </div>
                    </div>

                  
            </React.Fragment>
           
        );
    }
}

const mapStateToProps = state=>({
    nacionalidadChilena:state.parametrosIniciales.nacionalidadChilena,
    lenguaje:state.intl,
    sexos:state.persona.sexos,
    nacionalidades:state.persona.nacionalidades,
    persona:state.persona.persona,
    puestosTrabajo:state.mantenedor.puestosTrabajo
})
export default connect(mapStateToProps,{getNacionalidad,getSexo,getDatosPersona,getPuestosTrabajo})(DatosPersona);