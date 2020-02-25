import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import Select from 'react-select';
//redux
import { connect } from 'react-redux';
import { getMateriasQueja } from '../actions/mantenedorActions';


class DatosQueja extends Component{
    
    state = {
        selectedOption: null,
      }

      options = [
        ];
    
    componentDidMount(){
        this.props.getMateriasQueja().then(respuesta=>{ this.setState({error:''})}).catch((err) => {  this.setState({error:'Error de conexion'})  });
    }

    setCampo=e=>{
        this.props.setCampo(e.target.name,e.target.value);
    }
    
    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        //console.log(`Option selected:`, selectedOption);
        this.props.datos.materiaQueja=selectedOption;
      }

    actualizarOpciones(){
            this.options=[];
            this.props.materias.map((materia) => { 
                //console.log( this.options);
                this.options.push({ value:materia.id,
                                        label: (this.props.lenguaje.locale==='es') ? materia.glosa : materia.glosaIngles
                });
            
            });
    }

    validate=(validarCampos,materiaQueja,descripcionQueja)=> {
        // true means invalid, so our conditions got reversed
        //console.log(pasaporte+' '+paisPasaporte+' '+nombres);
        return {
            materiaQueja: materiaQueja.length === 0 && validarCampos,
            descripcionQueja: descripcionQueja==='' && validarCampos,

        };
      }

    render(){
        //const {materias,lenguaje}=this.props;
        //console.log( this.options);
        const errors = this.validate(this.props.datos.validarCampos,this.props.datos.materiaQueja,
        this.props.datos.descripcionQueja);
        this.props.datos.erroresDatosQueja=errors;
//        this.props.datos.erroresDatosEmbarcacion=errors;

        this.actualizarOpciones();
        return(
            <React.Fragment>
                    <div className="row">
                        <div className="col-md-8">
                            <h4><FormattedMessage id="tituloQueja" defaultMessage="" /></h4>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <label><FormattedMessage id="materia" defaultMessage="" /></label>
                        </div>
                        <div className="col-md-4">
                        
                        </div>
                    </div>

                    <div className="row">
                        
                        <div className={errors.materiaQueja ? "col-md-8 has-error" : "col-md-8"}>
                        <Select name="materiaQueja"
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                             options={this.options}
                             isMulti={true}
                             className="has-error"
                            />
                               
        
                                                  {
     
                        }                    
                        </div>
                    </div>
                   
                    <div className="row">
                    &nbsp;
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <label><FormattedMessage id="descripcionQueja" defaultMessage="" /></label>
                        </div>
                        <div className="col-md-4">
                        
                        </div>
                    </div>

                    <div className="row">
                        <div className={errors.descripcionQueja ? "col-md-8 has-error" : "col-md-8"}> 
                            <textarea  value={this.props.datos.descripcionQueja} onChange={this.setCampo} name="descripcionQueja" maxLength="1000" type="text" rows="5" className="form-control" />
                        </div>
                    </div>
            </React.Fragment>
           
        );
    }
}

const mapStateToProps = state=>({
    lenguaje:state.intl,
    materias:state.mantenedor.materiasQueja

    
})
export default connect(mapStateToProps,{getMateriasQueja})(DatosQueja);