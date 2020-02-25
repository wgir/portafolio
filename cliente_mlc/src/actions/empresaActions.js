import { GET_EMPRESA } from './types';
import axios from 'axios';
import {api_url} from '../Constants';



export const getDatosEmpresa =(rut,dv)=> async dispatch =>{
    const respuesta= await axios.get(api_url()+`/mlc/getDatosEmpresa/${rut}/${dv}`);
    dispatch({
        type : GET_EMPRESA,
        payload: respuesta.data
    })
}

