//require('dotenv').config()
import React, { Component } from 'react';
import './App.css';

//redux
import {Provider,updateIntl} from 'react-intl-redux';
import { addLocaleData } from "react-intl";
import esLocaleData from "react-intl/locale-data/es";
import store from './store';

import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'; 


//components
import Header from './components/main/Header';
import Footer from './components/main/Footer';
import Fin from './components/Fin';
import SeleccionarPuerto from './components/SeleccionarPuerto';
import LlenarQueja from './components/LlenarQueja';


//i18n
import {IntlProvider} from 'react-intl';
import esTranslations from './locales/es.json';
import enTranslations from './locales/en.json';


addLocaleData(esLocaleData);
class App extends Component {
  
  
  constructor(props) {
    super(props);
    /*this.state={
      lenguaje:'es'
    }*/
    this.changeLocale=this.changeLocale.bind(this);
  }

  changeLocale (){
    let locale;
    if (store.getState().intl.locale === "en") {
      locale = esTranslations;
      locale.locale='es';
    } else {
      locale = enTranslations
      locale.locale='en';
    }
    //console.log(locale);
    //this.setState({lenguaje:locale.locale});
    store.dispatch(updateIntl(locale));
  }; 


  render() {
    //const {lenguaje}=this.state;
    return (
          <Provider store ={store}>
          <IntlProvider>
            <Router>
              <React.Fragment>
                <Header changeLocale={this.changeLocale.bind(this)} />
                <div className="container">
                  <Switch>
                    {/*<Route exact path={`/`} component={Inicio} />*/}
                    <Route exact path="/" component={SeleccionarPuerto} />
                    <Route exact path={`/mlc`} component={LlenarQueja} />
                    <Route exact path={`/fin`} component={Fin} />
                  </Switch>
                </div>
                <Footer/>
              </React.Fragment>
              
            </Router>
            </IntlProvider>
          </Provider>
     
    );
  }
}

export default App;
