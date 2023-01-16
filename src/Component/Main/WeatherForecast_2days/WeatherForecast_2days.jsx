import React from "react";
import WeatherCard_2days from "./WeatherCard_2days";


export default function WeatherForecast_2days(props){

    const weatherCards = props.weather_2days.map((weather, index) => {
        return (
            <WeatherCard_2days
                key = {index}
                weatherInfo = {weather}
            />
        );
    })

    return(
        <div className = "weatherForecast-2days_1week grid-column_row-2days justify-self-start align-self-end">

            <p className = "weatherForecast-2days_1week-title">
                三小時預報
            </p>
            
            <div className = "weatherCard-2days_1week-container">
                {weatherCards}
            </div>

        </div>
        
        
    );
}