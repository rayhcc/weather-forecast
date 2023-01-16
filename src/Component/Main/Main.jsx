import React, {useState, useEffect, useRef} from "react";
import WeatherForecast_36hrs from "./WeatherForecast_36hrs/WeatherForecast_36hrs";
import WeatherForecast_2days from "./WeatherForecast_2days/WeatherForecast_2days";
import WeatherForecast_1week from "./WeatherForecast_1week/WeatherForecast_1week";
import {parseDate} from "./function";
import { WeatherInfo_36HRS, WeatherInfo_2DAYS, WeatherInfo_1WEEK } from "./class";


const API_KEY = "CWB-73463955-BBF8-4E22-8263-36350004FF80";
const DATA_FORMAT = "JSON"
const DATA_ID_36HRS = "F-C0032-001";
const DATA_ID_2DAYS = "F-D0047-089";
const DATA_ID_1WEEK = "F-D0047-091";


const fetchTaiwanCity = () => {
    return fetch("https://raw.githubusercontent.com/donma/TaiwanAddressCityAreaRoadChineseEnglishJSON/61c9ec364c82b80fc652dc83c0697ad7554c9760/CityCountyData.json")
        .then(response => response.json())
        .then(cityData => {
            return cityData.reduce((cityNames, city, index) => {
                
                if(index!==5 && index!==18){
                    cityNames.push(city.CityName);
                }
                return cityNames;
            }, [])
        })
}

const fetchWeatherForcast = (data_id, location) => {

    const extractTargetElements = (weatherElements, targetElementNames) => {
        const targetElements = weatherElements.reduce((target, elem, index) => {
            if(targetElementNames.includes(elem.elementName)){
                target[elem.elementName] = elem;
            }
            return target;
        }, {});

        return targetElements;
    }

    const weatherDataHandler = {
        [DATA_ID_36HRS]: (data) => {
            const weatherInfos = Array.from({length: 3}, () => new WeatherInfo_36HRS());
            const weatherElements = data.records.location[0].weatherElement;
            const targetElements = extractTargetElements(weatherElements, ["Wx", "PoP", "MinT", "MaxT"]);

            weatherInfos.forEach((info, index) => {
                weatherInfos[index].parseWxElement(targetElements.Wx.time[index]);
                weatherInfos[index].parseMinTElement(targetElements.MinT.time[index]);
                weatherInfos[index].parseMaxTElement(targetElements.MaxT.time[index]);
                weatherInfos[index].parsePoPElement(targetElements.PoP.time[index]);
            })

            return weatherInfos;
        },

        [DATA_ID_2DAYS]: (data) => {
            const weatherInfos = Array.from({length: 16}, () => new WeatherInfo_2DAYS());
            const weatherElements = data.records.locations[0].location[0].weatherElement;
            const targetElements = extractTargetElements(weatherElements, ["Wx", "PoP6h", "T"]);

            weatherInfos.forEach((info, index) => {
                weatherInfos[index].parseWxElement(targetElements.Wx.time[index]);
                weatherInfos[index].parseTElement(targetElements.T.time[index]);
                weatherInfos[index].parsePoP6hElement(targetElements.PoP6h.time[Math.floor(index / 2.0)]);
            })

            return weatherInfos;
        },

        [DATA_ID_1WEEK]: (data) => {
            const weatherInfos = Array.from({length: 7}, () => new WeatherInfo_1WEEK());
            const weatherElements = data.records.locations[0].location[0].weatherElement;
            const targetElements = extractTargetElements(weatherElements, ["Wx", "T"]);

            let ptr = 0;
            let lastWeatherInfoDate = parseDate(Date.parse(targetElements.Wx.time[0].startTime.replace(/\-/g, '/'))).date;

            for(let ei = 0; ei < 14; ++ei){
    
                const currentWeatherElementDate = parseDate(Date.parse(targetElements.Wx.time[ei].startTime.replace(/\-/g, '/'))).date;
    
                if(currentWeatherElementDate !== lastWeatherInfoDate){
                   ptr++; 

                   if(ptr >= 7){
                    break;
                   }
                   
                   lastWeatherInfoDate = currentWeatherElementDate;
                }
    
                weatherInfos[ptr].parseWxElement(targetElements.Wx.time[ei]);
                weatherInfos[ptr].parseTElement(targetElements.T.time[ei]);
            }

            return weatherInfos;
        },
    }
    
    return fetch(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/${data_id}?Authorization=${API_KEY}&format=${DATA_FORMAT}&locationName=${location}`)
        .then((response) => response.json())
        .then(data => weatherDataHandler[data_id](data));
}





export default function Main() {

    const [location, setLocation] = useState("臺北市")
    const [TaiwanCities, setTaiwanCities] = useState([location]);
    const [weather_36hrs, setWeather_36hrs] = useState(Array.from({length: 3}, () => new WeatherInfo_36HRS()));
    const [weather_2days, setWeather_2days] = useState(Array.from({length: 16}, () => new WeatherInfo_2DAYS()));
    const [weather_1week, setWeather_1week] = useState(Array.from({length: 7}, () => new WeatherInfo_1WEEK()));


    useEffect(() => {
        
        fetchTaiwanCity()
            .then( cityNames => setTaiwanCities(cityNames) );
    }, []);

    useEffect(() => {

        Promise.all([
            fetchWeatherForcast(DATA_ID_36HRS, location),
            fetchWeatherForcast(DATA_ID_2DAYS, location),
            fetchWeatherForcast(DATA_ID_1WEEK, location),
        ])  
        .then(data =>{
            setWeather_36hrs(data[0]);
            setWeather_2days(data[1]);
            setWeather_1week(data[2]);
        });

    }, [location]);




    return(
        <main className = "weather-forecast-conatiner">

            <WeatherForecast_36hrs
                location = {location}
                setLocation = {setLocation}
                TaiwanCities = {TaiwanCities}
                weather_36hrs = {weather_36hrs}
            />

            <WeatherForecast_2days 
                weather_2days = {weather_2days}
            />

            <WeatherForecast_1week
                weather_1week = {weather_1week}
            />
            
        </main>
    );
}