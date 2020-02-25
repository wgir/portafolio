import React , {Component} from 'react';

class Footer extends Component
{
    render(){

        //console.log('process.env.REACT_APP_ENVIROMENT: ', process.env.REACT_APP_ENVIRONMENT);
        return(
            <div className="footer">
            Dirección del Trabajo, Gobierno de Chile  <small><b>{process.env.REACT_APP_ENVIRONMENT}</b></small>
            </div>
        );
    }
}

export default Footer;