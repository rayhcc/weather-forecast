import React from "react";


export default function Location(props) {

    const handleChange = (e) => {
        props.setLocation(e.target.value);
    };

    const TaiwanCitiesOptions = props.TaiwanCities.map((city, index) => {
        return(
            <option 
                key = {index}
                value = {city}
            > 
                {city} 
            </option>
        ) 
    })

    return(
        <select className = "location-select justify-self-end" value = {props.location} onChange = {handleChange}>

            {TaiwanCitiesOptions}

        </select>
    );
}