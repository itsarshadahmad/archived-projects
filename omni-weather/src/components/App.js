import { useState, useEffect } from "react";
import Weather from "./Weather";
import Loading from "./Loading";
import "./styles.css"

function App() {
  const [city, setCity] = useState("varanasi")
  const [isLoaded, setIsLoaded] = useState(false)
  const [response, setResponse] = useState()
  const [img, setImg] = useState({})
  const RAPIDAPI_KEY = "YOUR_RAPID_API_KEY"

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
      }
    }

    fetch(`https://community-open-weather-map.p.rapidapi.com/weather?q=${city}&units=metric`, options)
      .then(res => res.json())
      .then(data => {
        setResponse(data)
        setIsLoaded(true)
      }).catch(error => console.log(error))
  }, [city])

  return (
    <div className="app" style={img}>
      {isLoaded ? <Weather data={response} cityName={setCity} img={setImg} /> : <Loading />}
    </div>
  )
}

export default App;