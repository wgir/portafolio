import { GET_PUESTOS_TRABAJO,GET_MATERIAS_QUEJAS } from './types';
import axios from 'axios';
import {api_url} from '../Constants';



export const getPuestosTrabajo =()=> async dispatch =>{
    const respuesta= await axios.get(api_url()+'/mlc/getPuestosTrabajo');
    dispatch({
        type : GET_PUESTOS_TRABAJO,
        payload: respuesta.data
    })
}





export const getMateriasQueja =()=> async dispatch =>{
    const respuesta= await axios.get(api_url()+'/mlc/getMateriasQueja');
    dispatch({
        type : GET_MATERIAS_QUEJAS,
        payload: respuesta.data
    })
}