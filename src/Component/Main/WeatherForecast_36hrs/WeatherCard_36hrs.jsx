import React from "react";
import {parseDate, to2Digit_string} from "../function";


const GetWeatherCardTime = (ms) => {

    const today = parseDate(new Date().getTime());
    const weatherInfoDate = parseDate(ms);

    return(
        (today.date===weatherInfoDate.date ? "今日" : "明日") 
        + 
        (0 <= weatherInfoDate.hours && weatherInfoDate.hours < 6 ? "凌晨" :
         6 <= weatherInfoDate.hours && weatherInfoDate.hours < 18 ? "白天" :
         "晚上"
        )
    )
}


export default function WeatherCard_36hrs(props){

    return(
        <div className = "weatherCard-36hrs">

            <p className = "weatherCard-36hrs-time">
                { GetWeatherCardTime(Date.parse(props.weatherInfo.time.startTime.replace(/\-/g, '/') )) }
            </p>

            <img 
                className = "weatherCard-36hrs-icon"
                src = {`https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/${parseDate(Date.parse(props.weatherInfo.time.startTime.replace(/\-/g, '/'))).dayNight}/${to2Digit_string(props.weatherInfo.weatherDesc.value)}.svg`}
            >
            </img>
            
            <p className = "weatherCard-36hrs-temperature">
                {props.weatherInfo.temperature.MinT}&#xb0; ~ {props.weatherInfo.temperature.MaxT}&#xb0;
            </p>
            
            <p className = "weatherCard-36hrs-PoP">
                {props.weatherInfo.PoP}%
            </p>
            
            <p className = "weatherCard-36hrs-description">
                {props.weatherInfo.weatherDesc.name}
            </p>

        </div>
    );
}