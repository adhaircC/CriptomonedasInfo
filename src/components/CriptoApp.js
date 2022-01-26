import axios from "axios";
import './effects.css'
import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { useSearch } from "../hooks/useSearch";
import { useCounter } from "../hooks/useCounter";

export const CriptoApp=()=>{
  const [search, setSearch]= useState('');
  const {counter,increment,decrement,reset}=useCounter(1);
  const [coins,setCoins]=useState([]);
  const [cointable,setCoinTable]=useState([]);
  //const {search, handleInputChange, Filtrar}=useSearch(coins);
  
  useEffect(()=>{
      fetchData();
  },[]);
  const fetchData=async()=>{
      const data=await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${counter}&sparkline=false`);
      console.log(data.data);
      setCoins(data.data);
      setCoinTable(data.data);
  }
  const handleInputChange=(e)=>{
    setSearch(e.target.value);
    console.log(e.target.value)
    filtrar(e.target.value);
  }
  
  const filtrar=(terminoBusqueda)=>{
    const resultados=cointable.filter((coin)=>{
      if(coin.name.toLowerCase().includes(terminoBusqueda.toLowerCase())
      || coin.symbol.toLowerCase().includes(terminoBusqueda.toLowerCase())
      ){
        return coin;
      }
    });
    setCoins(resultados);
  }
  return(
    <div className="CriptoApp">
      <h1>Listado de mercado de monedas</h1>
      <div className="conteinerInput">
        <input 
          className="form-control inputSearch"
          value={search}
          placeholder="Buscar moneda"
          onChange={handleInputChange}
        />
      </div>
      <div >
        <table className="table table-dark mt-4 table-hover">
          <thead>
            <tr>
              <th>Puesto</th>
              <th>Moneda</th>
              <th>Valor</th>
              <th>Capitalización de mercado</th>
              <th>24h%</th>
              <th>Cambio de precio</th>
              <th>Precio mas alto</th>
              <th>Precio mas bajo</th>
            </tr>
          </thead>
          <tbody>
            {coins &&
            coins.map((coin)=>(
              <tr key={coin.id}>
                <td>{coin.market_cap_rank}</td>
                <td>
                  <img 
                    src={coin.image}
                    alt=""
                    className="me-4"
                    style={{ width: "5%" }}
                  />
                  <span>{coin.name}</span>
                  <span className="ms-3 text-muted text-uppercase">{coin.symbol}</span>
                </td>
                <td>${coin.current_price}</td>
                <td>${coin.market_cap}</td>
                <td className={coin.price_change_percentage_24h > 0 ? "text-success" : "text-danger"}>
                  {coin.price_change_percentage_24h}%
                </td>
                <td className={coin.price_change_24h>0 ? "text-success" : "text-danger"}>
                  ${coin.price_change_24h}
                </td>
                <td>{coin.high_24h}</td>
                <td>{coin.low_24h}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button 
        className='btn btn-success'
        onClick={decrement}
      >
        Previous Page
      </button>
      <button 
        className='btn btn-primary'
        onClick={reset}
      >
        First
      </button>
      <button 
        className='btn btn-success'
        onClick={increment}
      >
        Next Page
      </button>
    </div>
  )
}