import 'react'
import { useEffect, useState } from "react";
import './weather.css' 
function Weather(){
    const [city,setCity]=useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [weather,setWeather]=useState(null);
    
    const apikey="8af5266c9dacdc67de21fe0b6b245ab2";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`;
    
    function getweather(){setIsLoading(true);
    fetch(url).then(res=>res.json()).then(data=>{
            console.log(data);
            
            setWeather(data);
            setIsLoading(false);
        })
        .catch(err=>{
            console.log(err);
            setWeather(null);
        })
    }
    useEffect(()=>{
        getweather();
    },[city])

    return(
        <>
       
         
         <div className='weather-card row justify-content-start d-flex'>
         <h1 className=''>Weather App</h1>
         <div className='d-flex justify-content-center align-items-center'>
         <input type="text" value={city} onChange={(e)=>setCity(e.target.value)} placeholder="Enter City"  className='position-relative'/>
         <button onClick={getweather} className='position-absolute btn btn-primary material-symbols-outlined'><span class="material-symbols-outlined">
search
</span></button>
         </div>
         {isLoading && <p>Loading...</p>}
         <h1>{city}</h1>
         {weather && weather.list && weather.list.slice(0,5).map((day, index) => (  
            
    <div className='card mt-3 col-md-6 col-lg-3' key={index}>
    <img src={"https://openweathermap.org/img/wn/"+day.weather[0].icon+"@2x.png"} alt=""  className='img-fluid'/>
    <p>{day.dt_txt}</p>
    <p>Humidity: {day.main.humidity} %</p>
    <p>Temperature: {day.main.temp}</p>
    <p>Weather: {day.weather[0].description}</p>
    </div>
))}
         </div>
        </>
       
    )
}

export default Weather;