import {combineReducers} from 'redux';
import puertoReducer from './puertoReducer';
import personaReducer from './personaReducer';
import mantenedorReducer from './mantenedorReducer';
import empresaReducer from './empresaReducer';
import quejaReducer from './quejaReducer';
import { intlReducer } from "react-intl-redux";


export default combineReducers({
    intl: intlReducer,
    parametrosIniciales: (state = { nacionalidadChilena:'39'}) => state,
    dataPuertos: puertoReducer,
    persona: personaReducer,
    empresa: empresaReducer,
    mantenedor:mantenedorReducer,
    queja:quejaReducer

});