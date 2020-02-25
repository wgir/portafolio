import { GET_SEXOS, GET_NACIONALIDADES,GET_PERSONA,GET_EMPRESA } from './types';
import axios from 'axios';
import {api_url} from '../Constants';

export const getSexo =()=> async dispatch =>{
    const respuesta= await axios.get(api_url()+'/mlc/getSexo');
    dispatch({
        type : GET_SEXOS,
        payload: respuesta.data
    })
}


export const getNacionalidad =()=> async dispatch =>{
    const respuesta= await axios.get(api_url()+'/mantenedor/getNacionalidad');
    dispatch({
        type : GET_NACIONALIDADES,
        payload: respuesta.data
    })
}


export const getDatosPersona =(rut,dv,pasaporte)=> async dispatch =>{
    const respuesta= await axios.get(api_url()+`/mlc/getDatosPersona/${rut}/${dv}/${pasaporte}`);
    dispatch({
        type : GET_PERSONA,
        payload: respuesta.data
    })
}

export const getDatosEmpresa =(rut,dv)=> async dispatch =>{
    const respuesta= await axios.get(api_url()+`/mlc/getDatosEmpresa/${rut}/${dv}`);
    dispatch({
        type : GET_EMPRESA,
        payload: respuesta.data
    })
}

/*
export const eliminarProducto =id=> async dispatch =>{
    await axios.delete(`http://localhost:5000/productos/${id}`);
    dispatch({
        type : ELIMINAR_PRODUCTO,
        payload: id
    })
}

export const agregarProducto =producto=> async dispatch =>{
    const respuesta=await axios.post(`http://localhost:5000/productos`,producto);
    dispatch({
        type : AGREGAR_PRODUCTO,
        payload: respuesta.data
    })
}

*/