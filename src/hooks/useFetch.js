import React from 'react';
import axios from 'axios';
import { useState,useEffect } from 'react';


export const useFetch=(url)=>{
    const [coins,setCoins]=useState([])
    useEffect(()=>{
        fetchData();
    },[]);
    const fetchData=async()=>{
        const data=await axios.get(url);
        console.log(data.data);
        setCoins(data.data)
    }
    
    return{
        coins,
        setCoins
    }
}