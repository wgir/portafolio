
import {GET_PUERTOS,GET_NAVE_BY_OMI,GET_TIPONAVE,GET_PARAMETROS} from '../actions/types';


const initialState={
    parametros:{},
    puertos:[],
    nave:{},
    tiposNaves:[]
}

export default function(state=initialState,action){
    switch(action.type){
        case GET_PARAMETROS:
            return{
                ...state,
                parametros:action.payload
            }    
        case GET_PUERTOS:
            return{
                ...state,
                puertos:action.payload
            }
        case GET_NAVE_BY_OMI:
            return{
                ...state,
                nave:action.payload
            }
        case GET_TIPONAVE:
            return{
                ...state,
                tiposNaves:action.payload
            }    
        default:
                return state;
    }
}
