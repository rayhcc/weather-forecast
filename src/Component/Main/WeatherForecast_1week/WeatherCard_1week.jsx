import React from "react";
import {parseDate, to2Digit_string} from "../function";

const GetWeatherCardDay_Chinese = (ms) => {

    const today = new Date();

    const tomorrow = new Date(today.getTime());
    tomorrow.setDate(today.getDate() + 1);

    const weatherInfoDate = new Date(ms);
    const chineseDay = ["日", "一", "二", "三", "四", "五", "六"];

    return weatherInfoDate.getDate() === today.getDate() ? "今" :
        weatherInfoDate.getDate() === tomorrow.getDate() ? "明" :
        chineseDay[weatherInfoDate.getDay()];
}


export default function WeatherCard_1week(props){

    return(
        <div className = "weatherCard-2days_1week">
            
            <p className = "weatherCard-day-1week">
                {GetWeatherCardDay_Chinese(Date.parse(props.weatherInfo.night.time.startTime.replace(/\-/g, '/')))}
            </p>

            <p className = "weatherCard-2days_1week-time">
                {new Date(Date.parse(props.weatherInfo.night.time.startTime.replace(/\-/g, '/'))).getDate()}日
            </p>


            <div className = "weatherCard-1week-desc_temp">
                {
                    props.weatherInfo.day.time.startTime.length !== 0 && 
                    <img 
                        className = "weatherCard-2days_1week-icon"
                        src = {`https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/${to2Digit_string(props.weatherInfo.day.weatherDesc.value)}.svg`}
                    />
                }
                {
                    props.weatherInfo.day.time.startTime.length !== 0 && 
                    <p className = 'weatherCard-2days_1week-temperature'>
                        {props.weatherInfo.day.temperature}&#xb0;
                    </p>

                }
            </div>


            <div className = "weatherCard-1week-desc_temp">
                <img 
                    className = "weatherCard-2days_1week-icon"
                    src = {`https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/night/${to2Digit_string(props.weatherInfo.night.weatherDesc.value)}.svg`}
                />

                <p className = 'weatherCard-2days_1week-temperature'>
                    {props.weatherInfo.night.temperature}&#xb0;
                </p>
            </div>
        </div>
    );
}