import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';


class Fin extends Component{

    
    constructor() {
        super();
        
        this.state = {
          idQueja: ''
        };
      }

      componentDidMount(){
      
        console.log(this.props.location);
        //console.log(this.props.location.state.nave.clase);
        this.setState({
            idQueja:this.props.location.state.idQueja    });
    }

    atras=()=>{
        localStorage.removeItem('estadoSeleccionarPuerto');
        this.props.history.push('/');
    }

    render(){
        
        return(
            <React.Fragment>

                    <div className="row">
                        <div className="col-md-8">
                            <p className="text-justify"> <FormattedMessage id="leyendaFin" defaultMessage="" />{this.state.idQueja}</p>
                        </div>
                      </div>

                    
                    

                    <div className="row">
                            <div className="col-md-6">
                                &nbsp;
                            </div>
                            <br></br>
                            <div className="col-md-6">
                                <button onClick={this.atras} type="button" className="btn btn-secondary">
                                <FormattedMessage id="botonNuevaQueja" defaultMessage="" /></button>
                            </div>
                            <br></br>
                    </div>
                            
            </React.Fragment>
           
        );
    }
}

export default Fin;