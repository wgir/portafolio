import React, {Component} from 'react';


class Lenguaje extends Component{

        state = {
          lenguaje: 'es'
        };

        

    
      handleChange=(event)=>{
        this.setState({
            lenguaje: event.target.value
        });
      }

      render(){
       return(
            <React.Fragment>
                    <div className="row">
                        <div className="col-md-4 form-inline">
                                    <label className="radio radio-inline">
                                        <input
                                        type="radio"
                                        value="es"
                                        checked={this.state.lenguaje === "es"}
                                        onChange={this.handleChange}
                                        />
                                        Español
                                    </label>
                                
                                    <label>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                
                                    <label className="radio radio-inline">
                                        <input
                                        type="radio"
                                        value="en"
                                        checked={this.state.lenguaje === "en"}
                                        onChange={this.handleChange}
                                        />
                                        English
                                    </label>
                                
                        </div>
                    </div>
            </React.Fragment>
        );
    }

}

export default Lenguaje;