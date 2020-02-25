import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
//redux
import { connect } from 'react-redux';
import { getNacionalidad } from '../actions/personaActions';
import { getDatosEmpresa } from '../actions/empresaActions';


class DatosArmador extends Component{
    
    state={ 
        camposHabilitados:false,
        rutValido:true,
        errorRut:'',
        nombreArmador:''
     }
    
    setCampo=e=>{
        //console.log(e.target.name);
        this.props.setCampo(e.target.name,e.target.value);
    }
    
    cambioNacionalidad=e=>{
        this.setCampo(e);
        //this.setState({ camposHabilitados: (e.target.value===this.props.datos.nacionalidadChilena ? true : false)});
    }

    rutOnBlur=e=>{
        var rutCompleto=e.target.value;
        this.limpiarCamposBasicos();
        if(rutCompleto.indexOf('-')!==-1){
            this.setState({rutValido:true});
            var rut=rutCompleto.substr(0,rutCompleto.length-2);
            var dv=rutCompleto.substr(rutCompleto.length -1, 1);
            this.getDatosEmpresa(rut,dv);
        }else
            this.setState({rutValido:false, errorRut:'RUT inválido'});
    }

    getDatosEmpresa=(rut,dv)=>{
        //console.log(rut+' '+dv);
        this.props.getDatosEmpresa(rut,dv).then(response=>
            {
                        this.setState({error:''});
                        console.log(this.props.empresa);
                        if(this.props.empresa.estado===0)
                        {
                            if(this.props.empresa.empresa)
                            {
                                console.log(this.props.empresa);
                                //this.setState({camposHabilitados:true});
                                this.props.setCampo('nombreArmador',this.props.empresa.empresa.nombreEmpresa);
                                this.setState({nombreArmador:this.props.empresa.empresa.direcciones});
                                this.props.empresa.empresa.direcciones.map((direccion) => { 
                                        if(this.props.empresa.empresa.idCasaMatriz===direccion.id){
                                            this.props.setCampo('domicilioArmador',direccion.calle+' '+direccion.numero+' '+direccion.comuna);
                                        }
                                });
                                 


                            }/*else{
                                this.setState({camposHabilitados:false});
                            }*/
                        }else{
                            this.limpiarCamposBasicos();
                            this.setState({rutValido:false, errorRut:this.props.empresa.mensaje});
                        }
                            
                      
            }).catch(err => {   //console.log(err);
                this.setState({error:'Error de conexion'})  })
    }


    limpiarCamposBasicos=()=>{
        this.props.setCampo('nombreArmador','');
        this.props.setCampo('domicilioArmador','');
    }


    validate=(validarCampos,nacionalidadArmador,rutArmador,nombreArmador,domicilioArmador)=> {
        // true means invalid, so our conditions got reversed
        //console.log(pasaporte+' '+paisPasaporte+' '+nombres);
        return {
            nacionalidadArmador: nacionalidadArmador === '0' && validarCampos,
            rutArmador: rutArmador==='' && validarCampos ,
            nombreArmador: nombreArmador==='' && validarCampos,
            domicilioArmador: domicilioArmador=== '0' && validarCampos
        };
      }
    
      validate=(validarCampos,nacionalidadArmador,rutArmador,nombreArmador,domicilioArmador)=> {
        // true means invalid, so our conditions got reversed
        //console.log(pasaporte+' '+paisPasaporte+' '+nombres);
        return {
            nacionalidadArmador: nacionalidadArmador === '0' && validarCampos,
            rutArmador: rutArmador==='' && validarCampos ,
            nombreArmador: nombreArmador==='' && validarCampos,
            domicilioArmador: domicilioArmador=== '' && validarCampos
        };
      }

    render(){
        const {nacionalidades,lenguaje}=this.props;
        
        const errors = {};/*this.validate(this.props.datos.validarCampos,this.props.datos.nacionalidadArmador,
            this.props.datos.rutArmador,
            this.props.datos.nombreArmador,
            this.props.datos.domicilioArmador
            );
        this.props.datos.erroresDatosArmador=errors;
        */
        //console.log(this.state);
        return(
            <React.Fragment>
                    <div className="row">
                        <div className="col-md-4">
                            <label><FormattedMessage id="nacionalidadArmador" defaultMessage="" /></label>
                        </div>
                        <div className={errors.nacionalidadArmador ? "col-md-4 has-error" : "col-md-4"}>
                            <select  value={this.props.datos.nacionalidadArmador} className="form-control" name="nacionalidadArmador" onChange={this.cambioNacionalidad} >
                            <option value="0">{this.props.lenguaje.messages.seleccionar}</option>
                                {nacionalidades.map((nacionalidad) => <option key={nacionalidad.id} value={nacionalidad.id}>{ lenguaje.locale==='es' ? nacionalidad.gentilicio : nacionalidad.gentilicioIngles}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <label><FormattedMessage id="rutEmpresa" defaultMessage="" />     </label>
                        </div>
                        <div className={errors.rutArmador ? "col-md-4 has-error" : "col-md-4"}>
                            <input value={this.props.datos.rutArmador} onChange={this.setCampo} name="rutArmador" onBlur={this.rutOnBlur} maxLength="20" type="text" className="form-control" />
                        </div>
                        { !this.state.rutValido ?
                                <i className="small glyphicon glyphicon-info-sign" style={{ color:'red' }} > {this.state.errorRut}</i>
                                :''
                        }
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <label><FormattedMessage id="nombreEmpresa" defaultMessage="" /></label>
                        </div>
                        <div className={errors.nombreArmador ? "col-md-4 has-error" : "col-md-4"}>
                            <input value={this.props.datos.nombreArmador || ''}  onChange={this.setCampo} disabled={this.state.camposHabilitados} name="nombreArmador" maxLength="100" type="text" className="form-control" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <label><FormattedMessage id="direccionEmpresa" defaultMessage="" /></label>
                        </div>
                        <div className={errors.domicilioArmador ? "col-md-4 has-error" : "col-md-4"}>
                            <input value={this.props.datos.domicilioArmador || ''} onChange={this.setCampo} name="domicilioArmador" disabled={this.state.camposHabilitados} maxLength="200" type="text" className="form-control" />
                        </div>
                    </div>
            </React.Fragment>
           
        );
    }
}
const mapStateToProps = state=>({
    nacionalidadChilena:state.parametrosIniciales.nacionalidadChilena,
    lenguaje:state.intl,
    nacionalidades:state.persona.nacionalidades,
    empresa:state.empresa.empresa
})

export default connect(mapStateToProps,{getNacionalidad,getDatosEmpresa})(DatosArmador);