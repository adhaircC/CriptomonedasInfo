import React,{useState} from 'react';
import { useCounter } from './useCounter';
import { useFetch } from './useFetch';
import { CriptoApp } from '../components/CriptoApp';

export const useSearch=(coins)=>{
    const [search,setSearch]=useState('');
    const handleInputChange=(e)=>{
        setSearch(e.target.value);
        Filtrar(e.target.value);
    };
    const Filtrar=(termino)=>{
        var resultado=coins.filter((coin)=>{
            if (coin.name.toLowerCase().includes(termino.toLowerCase()) || coin.symbol.toLowerCase().includes(termino.toLowerCase()))
            {
                return resultado;
            }
        });
        setSearch(resultado);
    };
    return{
        search,
        handleInputChange,
        Filtrar
    }
}