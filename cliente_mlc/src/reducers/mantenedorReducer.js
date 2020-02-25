
import {GET_PUESTOS_TRABAJO,GET_MATERIAS_QUEJAS} from '../actions/types';

const initialState={
    puestosTrabajo:[],
    parametrosMLC:{},
    materiasQueja:[]
    
}

export default function(state=initialState,action){
    switch(action.type){
        case GET_PUESTOS_TRABAJO:
            return{
                ...state,
                puestosTrabajo:action.payload
            }
        
        case GET_MATERIAS_QUEJAS:
            return{
                ...state,
                materiasQueja:action.payload
            }
            default:
                return state;
    }
}
