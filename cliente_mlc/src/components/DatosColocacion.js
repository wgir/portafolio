import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import { connect } from 'react-redux';
import { getNacionalidad } from '../actions/personaActions';

class DatosColocacion extends Component{


    setCampo=e=>{
        //console.log(e.target.name);
        //this.setState({ [e.target.name]: e.target.value });
        this.props.setCampo(e.target.name,e.target.value);
    }

    validate=(validarCampos,rutContratacion,razonSocialContratacion,domicilioContratacion,paisContratacion)=> {
        // true means invalid, so our conditions got reversed
        //console.log(paisContratacion);
        return {
            rutContratacion: rutContratacion==='' && validarCampos ,
            razonSocialContratacion: razonSocialContratacion==='' && validarCampos,
            domicilioContratacion: domicilioContratacion=== '' && validarCampos,
            paisContratacion:paisContratacion==='0' && validarCampos
        };
      }
    

    render(){
        
        const {nacionalidades,lenguaje}=this.props;
        //const{seleccion}=this.state;
        
        const errors = {}/*this.validate(this.props.datos.validarCampos,
            this.props.datos.rutContratacion,
            this.props.datos.razonSocialContratacion, 
            this.props.datos.domicilioContratacion,
            this.props.datos.paisContratacion);
        this.props.datos.erroresDatosColocacion=errors;
        */
        return(
            <React.Fragment>
                            <div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <label><FormattedMessage id="rutEmpresa" defaultMessage="" /></label>
                                    </div>
                                    <div className={errors.rutContratacion ? "col-md-4 has-error" : "col-md-4"}>
                                        <input value={this.props.datos.rutContratacion} onChange={this.setCampo} name="rutContratacion" maxLength="20" type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <label><FormattedMessage id="nombreEmpresa" defaultMessage="" /></label>
                                    </div>
                                    <div className={errors.razonSocialContratacion ? "col-md-4 has-error" : "col-md-4"}>
                                        <input value={this.props.datos.razonSocialContratacion} onChange={this.setCampo} name="razonSocialContratacion" maxLength="100" type="text" className="form-control" />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-4">
                                        <label><FormattedMessage id="direccionEmpresa" defaultMessage="" /></label>
                                    </div>
                                    <div className={errors.domicilioContratacion ? "col-md-4 has-error" : "col-md-4"}>
                                        <input value={this.props.datos.domicilioContratacion} onChange={this.setCampo} name="domicilioContratacion" maxLength="200" type="text" className="form-control" />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-4">
                                        <label><FormattedMessage id="pais" defaultMessage="" /></label>
                                    </div>
                                    <div className={errors.paisContratacion ? "col-md-4 has-error" : "col-md-4"}>
                                        <select  value={this.props.datos.paisContratacion} className="form-control"  name="paisContratacion" onChange={this.setCampo} >
                                            <option value="0">{this.props.lenguaje.messages.seleccionar}</option>
                                            {nacionalidades.map((nacionalidad) => <option key={nacionalidad.id} value={nacionalidad.id}>{ lenguaje.locale==='es' ? nacionalidad.glosaPais : nacionalidad.glosaPaisIngles}</option>)}
                                        </select>
                                    </div>
                            </div>

                            </div>
            </React.Fragment>
           
        );
    }
}

const mapStateToProps = state=>({
    nacionalidadChilena:state.parametrosIniciales.nacionalidadChilena,
    nacionalidades:state.persona.nacionalidades,
    lenguaje:state.intl
});
export default connect(mapStateToProps,{getNacionalidad})(DatosColocacion);