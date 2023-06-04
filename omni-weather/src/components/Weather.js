import { useState, useEffect } from "react";
import { ColorExtraction } from "./ColorExtraction";
import WeatherDetail from "./WeatherDetail";

export default function Weather({ data, cityName, img }) {
    const [city, setCity] = useState("")
    const [weatherType, setWeatherType] = useState("")
    const [textColor, setTextColor] = useState("black")
    const UNSPLASH_API_KEY = "YOUR_UNSPLASH_API_KEY";
    const [image, setImage] = useState()
    const [colors, setColors] = useState()

    useEffect(() => {
        setWeatherType(data.weather[0].description)

        if (colors) {
            setTextColor(colors[0])
        }

        fetch(`https://api.unsplash.com/search/photos?query=${weatherType}&client_id=${UNSPLASH_API_KEY}&orientation=landscape`)
            .then(res => res.json())
            .then(data => {
                setImage(data.results[0].urls.regular)
                img({
                    backgroundImage: `url(${data.results[0].urls.regular})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    color: textColor
                })
            })
    }, [colors, data.weather, img, textColor, weatherType])

    function timeConverter(UNIX_timestamp) {
        let a = new Date(UNIX_timestamp * 1000);
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let year = a.getFullYear();
        let month = months[a.getMonth()];
        let date = a.getDate();
        let hour = a.getHours() < 10 ? "0" + a.getHours() : a.getHours();
        let min = a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes();
        let sec = a.getSeconds() < 10 ? "0" + a.getSeconds() : a.getSeconds();
        let time = hour + ':' + min + ':' + sec;
        let dateTime = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
        return {
            time: time,
            date: date,
            dateTime: dateTime
        };
    }

    function searchCity(event) {
        event.preventDefault()
        if (city) {
            cityName(city)
            setCity("")
        }
    }

    return (
        <div className="container">
            <ColorExtraction imageLink={image} setColors={setColors} />
            <div className="weather">
                <div className="temp" style={{ color: textColor }}>{data.main.temp}°C</div>
                <div className="info">
                    <div>
                        <div className="city-name">{data.name}</div>
                        <div className="date-time">{timeConverter(data.dt).dateTime}</div>
                    </div>
                    <div className="icon">
                        <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="weather icon" className="weather-icon" />
                        <div>
                            <div className="weather-type" style={{ color: textColor }}>{data.weather[0].main}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="details">
                <form>
                    <input
                        style={{ color: textColor }}
                        type="text"
                        className="input"
                        name="city-name"
                        id="city-name"
                        placeholder="Enter Your City"
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                        required
                    />
                    <button className="button" onClick={searchCity}>Search</button>
                </form>
                <p id="title-weather">Weather Details</p>
                <WeatherDetail title="Feels Like" data={data.main.feels_like + "°C"} />
                <WeatherDetail title="Description" data={data.weather[0].description} />
                <WeatherDetail title="Clouds" data={data.clouds.all + "%"} />
                <WeatherDetail title="Humidity" data={data.main.humidity + "%"} />
                <WeatherDetail title="Wind" data={data.wind.speed + " m/s"} />
                <WeatherDetail title="Pressure" data={data.main.pressure + " hPa"} />
                <WeatherDetail title="Sunrise" data={timeConverter(data.sys.sunrise).time} />
                <WeatherDetail title="Sunset" data={timeConverter(data.sys.sunset).time} />
                <WeatherDetail title="Visibility" data={data.visibility / 1000 + "Km"} />
            </div>
        </div>
    );
}
