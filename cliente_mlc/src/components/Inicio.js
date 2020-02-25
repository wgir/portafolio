import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';


class Inicio extends Component{

    
    constructor() {
        super();
        
        this.state = {
          pais: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount(){
        const estadoLS=localStorage.getItem('pais');
        if(estadoLS)
            this.setState(JSON.parse(estadoLS));
    }
      
    componentDidUpdate(){
        localStorage.setItem('pais',JSON.stringify(this.state));
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.history.push('/seleccionarPuerto');
       
      }

      handleChange(event) {
        this.setState({
          pais: event.target.value
        });
      }

    render(){
        
        return(
            <React.Fragment>

                    <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-md-8">
                            <label>SELECCIONAR PAIS</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <label><FormattedMessage id="paisRecalada" defaultMessage="Pais de Recalada" /></label>
                         </div>
                    
                         <div className="col-md-4 form-inline">
                               
                                    <label className="radio radio-inline">
                                        <input
                                        type="radio"
                                        value="chile"
                                        checked={this.state.pais === "chile"}
                                        onChange={this.handleChange}
                                        />
                                        Chile
                                    </label>
                                
                                    <label>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                
                                    <label className="radio radio-inline">
                                        <input
                                        type="radio"
                                        value="otro"
                                        checked={this.state.pais === "otro"}
                                        onChange={this.handleChange}
                                        />
                                        Otro
                                    </label>
                                
                         </div>
                    </div>
                    
                    <div className="row">
                    <br></br>
                    </div>
                    <div className="row col-md-6 justify-content-end">
                        <button type="submit">Ingresar</button>
                    </div>
                    
                    </form>
            </React.Fragment>
           
        );
    }
}

export default Inicio;