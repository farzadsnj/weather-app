import './App.css';
import { useState } from 'react';
import Search from './components/search/Search'
import CurrentWeather from './components/search/current-weather/CurrentWeather';
import { WEATHER_API_KEY, WEATHER_API_URL } from './components/search/Api';
import ForecastWeather from './components/forecast/ForecastWeather';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecastWeather, setForecastWeather] = useState(null)

  const hanleOnSearchChange = (searchData) =>{
    const [lat, lon] = searchData.value.split(' ')
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
    const forecastWeatherFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    Promise.all([currentWeatherFetch, forecastWeatherFetch])
      .then(async(res) =>{
        const weatherRes = await res[0].json()
        const forecastRes = await res[1].json()

        setCurrentWeather({city: searchData.label, ...weatherRes})
        setForecastWeather({city: searchData.label, ...forecastRes})
      })
      .catch((err)=> console.log(err))
  }

  console.log(currentWeather)
  console.log(forecastWeather)

  return (
    <div className="container">
      <Search onSearchChange={hanleOnSearchChange}/>
      {currentWeather && <CurrentWeather data={currentWeather}/>}
      {forecastWeather && <ForecastWeather data={forecastWeather}/>}
    </div>
  );
}

export default App;
