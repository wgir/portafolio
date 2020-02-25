import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {FormattedMessage} from 'react-intl';
//import Lenguaje from './Lenguaje';


class Header extends Component{

    constructor(props) {
        super(props);
        this.state = {
          //  lenguaje: 'es'
          };
        this.handleChange = this.handleChange.bind(this);
    }

    
    componentDidMount(){
       // const {lenguaje}=this.props;
       /* const estadoLS=localStorage.getItem('lenguaje');
        if(estadoLS)
            this.setState(JSON.parse(estadoLS));
            */
    }
   
    /*
    componentDidUpdate(){
        localStorage.setItem('lenguaje',JSON.stringify(this.state));
    }
    */

    handleChange(event){
      this.setState({ locale: event.target.value }, () => {
        this.props.changeLocale();
      }); 

     
      
    }

    render(){
        
        const {lenguaje}=this.props;
        //console.log(lenguaje);
        return(
        <React.Fragment>

            <div className="row headerRow">
                <img src="img/logo-dt-gob.png" alt="logo dt"/>  
                <img src="img/logo_dmar.png" alt="logo dmas"/>
                <img src="img/MINSAL.jpg" alt="logo minsal"/>
                {/*
                <div className="col-md-2">
                    <div className="">
                        <img src="img/logo-dt-gob.png" alt="logo dt"/>
                    </div>
                    
                </div>
                <div className="col-md-2">
                    <div className="">
                        <img src="img/logo_dmar.png" alt="logo dt"/>
                    </div>
                    
                </div>
                */}
                <div className="col-md-8 tituloHeader">
                    <h3><FormattedMessage id="tituloHeader" defaultMessage="" /></h3>
                </div>
            </div>
            <div className="row">
                    <div className="col-md-4 lineLeftHeaderPadding">
                        <div className="lineLeftHeader"></div>
                    </div>
                    <div className="col-md-8 lineRightHeaderPadding">
                        <div className="lineRightHeader"></div>
                    </div>
            </div>

            <div className="row">
                        <div className="col-md-4 form-inline">
                                    <label className="radio radio-inline">
                                        <input
                                        type="radio"
                                        value="es"
                                        checked={lenguaje.locale === "es"}
                                        onChange={this.handleChange}
                                        />
                                        Español
                                    </label>
                                
                                    <label>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                
                                    <label className="radio radio-inline">
                                        <input
                                        type="radio"
                                        value="en"
                                        checked={lenguaje.locale === "en"}
                                        onChange={this.handleChange}
                                        />
                                        English
                                    </label>
                                
                        </div>
            </div>
            <div className="row headerRow">
               
                
            </div>
            

            
            


         
        </React.Fragment>            
        );
    }
}
// <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-beetween d-flex" >
//<Link to={'/productos/nuevo'} className="btn btn-danger nuevo-post" >Agregar Producto &#43;</Link>
const mapStateToProps = state=>({
    lenguaje:state.intl
    
})
export default connect(mapStateToProps)(Header);