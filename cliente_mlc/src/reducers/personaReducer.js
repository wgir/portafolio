
import {GET_SEXOS,GET_NACIONALIDADES,GET_PERSONA} from '../actions/types';

const initialState={
    sexos:[],
    nacionalidades:[]
}

export default function(state=initialState,action){
    switch(action.type){
        case GET_SEXOS:
            return{
                ...state,
                sexos:action.payload
            }
        
        case GET_NACIONALIDADES:
            return{
                ...state,
                nacionalidades:action.payload
            }

        case GET_PERSONA:
            return{
                ...state,
                persona:action.payload
            }
            default:
                return state;
    }
}
