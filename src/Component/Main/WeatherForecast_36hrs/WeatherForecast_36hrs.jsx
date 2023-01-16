import React from "react";
import WeatherCard_36hrs from "./WeatherCard_36hrs";
import Location from "./Location";

export default function WeatherForecast_36hrs(props) {

    const weatherCards = props.weather_36hrs.map((weather, index) => {
        return(
            <WeatherCard_36hrs
                key = {index}
                weatherInfo = {weather}
            />
        ) 
    });

    return(
        <div className = "weatherForecast-36hrs  justify-self-end align-self-end">
            <Location 
                location = {props.location}
                setLocation = {props.setLocation}
                TaiwanCities = {props.TaiwanCities}
            />

            <div className = "weatherCard-36hrs-container">
                {weatherCards}        
            </div>
        </div>
        
    );
}