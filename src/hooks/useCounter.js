import {useState} from 'react'

export const useCounter=(initialState=1)=>{
    const [counter,setCounter]=useState(initialState)
    const increment=( )=>{
        setCounter(counter+1);
        console.log(counter);
    }
    const decrement=( )=>{
        if (counter==1){
            setCounter(initialState);
        }
        else{
            setCounter(counter-1);
        }
        console.log(counter);
    }
    const reset=( )=>{
        setCounter(initialState);
        console.log(counter);
    }
    return{
        counter,
        increment,
        decrement,
        reset
    }
}