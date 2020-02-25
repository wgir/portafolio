import { GET_NAVE_BY_OMI,GET_TIPONAVE } from './types';
import axios from 'axios';
import {api_url} from '../Constants';

export const getNaveByOMI =(OMI)=> async dispatch =>{
    const respuesta= await axios.get(api_url()+`/mantenedor/getNaveByOMI/${OMI}`);
    dispatch({
        type : GET_NAVE_BY_OMI,
        payload: respuesta.data
    })
}

export const getTipoNave =()=> async dispatch =>{
    const respuesta= await axios.get(api_url()+`/mlc/getTipoNave`);
    dispatch({
        type : GET_TIPONAVE,
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