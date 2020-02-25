
import {POST_QUEJA} from '../actions/types';

const initialState={
    respuesta:{}
}

export default function(state=initialState,action){
    switch(action.type){
        case POST_QUEJA:
            return{
                ...state,
                respuesta:action.payload
            }
            default:
                return state;
    }
}
