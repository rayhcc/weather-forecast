import React , {useState, useEffect} from "react"
import weather_icon from "./weather-icon.svg";

export default function Header(){

    return(
        <header>
            
            <img 
                className = "app-logo" 
                src = {weather_icon}
            />

            天氣預報
        </header>
    );
}