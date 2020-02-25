import { POST_QUEJA } from './types';
import axios from 'axios';
import {api_url} from '../Constants';

export const registrarQueja=(queja)=> async dispatch =>{
    //console.log(queja);
    const respuesta= await axios.post(api_url()+`/mlc/registrarQueja`,queja);
    dispatch({
        type : POST_QUEJA,
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