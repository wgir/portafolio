import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
//redux
import { connect } from 'react-redux';
//import { getActividadesBuque } from '../actions/mantenedorActions';
import { getNacionalidad } from '../actions/personaActions';
import {todayPlusDays} from './comun/Utils';

//var today = new Date();




  
class DatosEmbarcacion extends Component{
    
    state={
        fechaActual:todayPlusDays(0)
        
      
    }
    componentDidMount(){
        this.props.getNacionalidad().then(respuesta=>{ this.setState({error:''})}).catch((err) => {  this.setState({error:'Error de conexion'})  });
    }

    setCampo=e=>{
        //console.log(e.target.name);
        this.props.setCampo(e.target.name,e.target.value);
    }
    

    cambioCombo=e=>{
        this.setCampo(e);
    }

    validate=(validarCampos,nombreCapitan,nacionalidadCapitan,fechaEmbarco,fechaDesembarco)=> {
        // true means invalid, so our conditions got reversed
        var error='';
        
        if(fechaEmbarco!=='' && fechaDesembarco!=='')
        {
             if(fechaEmbarco>fechaDesembarco)
                error=this.props.lenguaje.messages.errorFechaEmbarcoMayorDesembarco;
             if(fechaEmbarco>this.state.fechaActual)
                error=this.props.lenguaje.messages.errorFechaEmbarcoMayorActual;
        }
        
            //console.log(fechaEmbarco+' '+fechaDesembarco+' '+error);
        return {
            nombreCapitan: nombreCapitan==='' && validarCampos,
            nacionalidadCapitan: nacionalidadCapitan === '0' && validarCampos,
            fechaEmbarco: (fechaEmbarco===''  || error!=='') && validarCampos,
            //fechaDesembarco: fechaDesembarco=== '' && validarCampos,
            error
        };
      }
 


    render(){
        const {nacionalidades,lenguaje}=this.props;
        const errors = this.validate(this.props.datos.validarCampos,
            this.props.datos.nombreCapitan,
            this.props.datos.nacionalidadCapitan,
            this.props.datos.fechaEmbarco, this.props.datos.fechaDesembarco);
            //console.log(this.state.fechaActual);
            this.props.datos.erroresDatosEmbarcacion=errors;
        return(
            <React.Fragment>
                    <div className="row">
                        <div className="col-md-8">
                            <h4><FormattedMessage id="tituloEmbarcacion" defaultMessage="" /> </h4>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <label><FormattedMessage id="tipoNave" defaultMessage="" /></label>
                        </div>
                        <div className="col-md-4">
                            <input value={this.props.datos.tipoNavegacion} onChange={this.setCampo} name="tipoNavegacion" type="text" disabled={true} className="form-control" />
                        </div>
                    </div>

                    {/*
                    <div className="row">
                        <div className="col-md-4">
                            <label>Actividad</label>
                        </div>

                        <div className="col-md-4">
                            <select  className="form-control" name="actividadBuque" value={this.props.datos.actividadBuque} onChange={this.cambioCombo} >
                                <option value="0">{ lenguaje.locale==='es' ? '--Seleccionar--' : '--Select--' }</option>
                                {actividadesBuque.map((actividad) => <option key={actividad.id} value={actividad.id}>{ lenguaje.locale==='es' ? actividad.glosa : actividad.glosaIngles}</option>)}
                            </select>
                        </div>
                     
                    </div>
                    */ }
                    <div className="row">
                        <div className="col-md-4">
                            <label><FormattedMessage id="nombreCapitan" defaultMessage="" /></label>
                        </div>
                        <div className={errors.nombreCapitan ? "col-md-4 has-error" : "col-md-4"} >
                            <input value={this.props.datos.nombreCapitan} onChange={this.setCampo} name="nombreCapitan" maxLength="100" type="text" className="form-control" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <label><FormattedMessage id="paisCapitan" defaultMessage="" /></label>
                        </div>
                        <div className={errors.nacionalidadCapitan ? "col-md-4 has-error" : "col-md-4"} >
                            <select value={this.props.datos.nacionalidadCapitan}  className="form-control" name="nacionalidadCapitan" onChange={this.cambioCombo} >
                                <option value="0">{this.props.lenguaje.messages.seleccionar}</option>
                                {nacionalidades.map((nacionalidad) => <option key={nacionalidad.id} value={nacionalidad.id}>{ lenguaje.locale==='es' ? nacionalidad.gentilicio : nacionalidad.gentilicioIngles}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <label><FormattedMessage id="bandera" defaultMessage="" /></label>
                        </div>
                        <div className="col-md-4">
                            <input value={this.props.datos.bandera} onChange={this.setCampo} name="bandera" disabled={true} type="text" className="form-control" />
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-md-4">
                            <label><FormattedMessage id="fechaEmbarco" defaultMessage="" /></label>
                        </div>
                        <div className={errors.fechaEmbarco ? "col-md-4 has-error" : "col-md-4"} >
                            <input onChange={this.setCampo} name="fechaEmbarco" type="date" max={this.state.fechaActual} className="form-control" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <label><FormattedMessage id="fechaDesembarco" defaultMessage="" /></label>
                        </div>
                        <div className={errors.fechaDesembarco ? "col-md-4 has-error" : "col-md-4"} >
                            <input onChange={this.setCampo} name="fechaDesembarco" min={ (this.props.datos.fechaEmbarco===null || this.props.datos.fechaEmbarco==='') ? this.state.fechaActual : this.props.datos.fechaEmbarco} type="date" className="form-control" />
                        </div>
                    </div>

                    
            </React.Fragment>
           
        );
    }
}

const mapStateToProps = state=>({
    lenguaje:state.intl,
    //actividadesBuque:state.mantenedor.actividadesBuque,
    nacionalidades:state.persona.nacionalidades,
    
})
export default connect(mapStateToProps,{getNacionalidad})(DatosEmbarcacion);