import React from "react";
import {parseDate, to2Digit_string} from "../function";


const GetWeatherCardTime = (ms) => {

    const today = new Date();

    const tomorrow = new Date(today.getTime());
    tomorrow.setDate(today.getDate() + 1);

    const dayAfterTomorrow = new Date(today.getTime());
    dayAfterTomorrow.setDate(today.getDate() + 2);
    

    const weatherInfoDate = parseDate(ms);

    if(weatherInfoDate.hours !== 0){
        return weatherInfoDate.hours + "時";
    }
    else{
        return weatherInfoDate.date === tomorrow.getDate() ? "明日" :
            weatherInfoDate.date === dayAfterTomorrow.getDate() ? "後天" :
            weatherInfoDate.hours + "時";
    }
}


export default function WeatherCard_2days(props){

    return(
        <div className = "weatherCard-2days_1week">

            <img 
                className = "weatherCard-2days_1week-icon"
                src = {`https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/${parseDate(Date.parse(props.weatherInfo.time.startTime)).dayNight}/${to2Digit_string(props.weatherInfo.weatherDesc.value)}.svg`}
            />

            <p className = "weatherCard-2days-PoP">
                {props.weatherInfo.PoP}%
            </p>

            <p className = "weatherCard-2days_1week-temperature">
                {props.weatherInfo.temperature}&#xb0;
            </p>

            <p className = "weatherCard-2days_1week-time">
                {GetWeatherCardTime(Date.parse(props.weatherInfo.time.startTime))}
            </p>

        </div>
    );
}