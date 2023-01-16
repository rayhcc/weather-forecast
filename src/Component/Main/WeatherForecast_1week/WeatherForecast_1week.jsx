import React from "react"
import WeatherCard_1week from "./WeatherCard_1week"

export default function WeatherForecasr(props){

    const weatherCards = props.weather_1week.map((item, index) => {

        return (
            <WeatherCard_1week
                key = {index}
                weatherInfo = {item}
            />
        );
    });
    

    return(
        <div className = "weatherForecast-2days_1week grid-column_row-1week justify-self-start align-self-start ">

            <p className = "weatherForecast-2days_1week-title">
                一週預報
            </p>

            <div className = "weatherCard-2days_1week-container">
                <div className = "weatherCard-2days_1week">
                    <p className = "weatherCard-1week-dayNight"> 早 </p>
                    <p className = "weatherCard-1week-dayNight"> 晚 </p>
                </div>

                {weatherCards}
            </div>

        </div>
    );
}