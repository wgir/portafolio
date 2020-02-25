import { GET_PUERTOS,GET_PARAMETROS } from './types';
import axios from 'axios';
import {api_url} from '../Constants';


export const getPuertos =()=> async dispatch =>{
    const respuesta= await axios.get(api_url()+'/mlc/getPuerto');
    dispatch({
        type : GET_PUERTOS,
        payload: respuesta.data
    })
}

export const getParametros =()=> async dispatch =>{
    const respuesta= await axios.get(api_url()+'/mlc/getParametros');
    dispatch({
        type : GET_PARAMETROS,
        payload: respuesta.data
    })
}