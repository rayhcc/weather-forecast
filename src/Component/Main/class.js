import {parseDate} from "./function";

export class WeatherInfo_36HRS {
    constructor(weatherElement) {
        this.time = {
            startTime: "",
            endTime: "",
        };

        this.weatherDesc = {
            name: "",
            value: "",
        };

        this.temperature = {
            MinT: "",
            MaxT: "",
        }

        this.PoP = "0";
    }

    parseWxElement(weatherElement) {
        ({startTime: this.time.startTime, endTime: this.time.endTime} = weatherElement);
        ({parameterName: this.weatherDesc.name, parameterValue: this.weatherDesc.value}  = weatherElement.parameter);
    }

    parseMinTElement(weatherElement) {
        this.temperature.MinT = weatherElement.parameter.parameterName;
    }

    parseMaxTElement(weatherElement){
        this.temperature.MaxT = weatherElement.parameter.parameterName;
    }

    parsePoPElement(weatherElement){
        this.PoP = weatherElement.parameter.parameterName;
    }
}

export class WeatherInfo_2DAYS {
    constructor(weatherElement){
        this.time = {
            startTime: "",
            endTime: "",
        };

        this.weatherDesc = {
            name: "",
            value: "",
        };

        
        this.temperature = "0";

        this.PoP = "0";
    }

    parseWxElement(weatherElement){
        ({startTime: this.time.startTime, endTime: this.time.endTime} = weatherElement);
        this.weatherDesc.name = weatherElement.elementValue[0].value;
        this.weatherDesc.value = weatherElement.elementValue[1].value;
    }

    parseTElement(weatherElement){
        this.temperature = weatherElement.elementValue[0].value;
    }

    parsePoP6hElement(weatherElement){
        this.PoP = weatherElement.elementValue[0].value;
    }
}

export class WeatherInfo_1WEEK {
    constructor(weatherElement) {
        this.day = {
            time: {
                startTime: "",
                endTime: "",
            },
    
            weatherDesc: {
                name: "",
                value: "123",
            },
    
            temperature: "",
        }

        this.night = {
            time: {
                startTime: "",
                endTime: "",
            },
    
            weatherDesc: {
                name: "",
                value: "",
            },
    
            temperature: "",
        }
    }

    parseWxElement(weatherElement){
        const dayNight = parseDate(Date.parse(weatherElement.startTime)).dayNight;
        ({startTime: this[dayNight].time.startTime, endTime: this[dayNight].time.endTime} = weatherElement);
        this[dayNight].weatherDesc.name = weatherElement.elementValue[0].value;
        this[dayNight].weatherDesc.value = weatherElement.elementValue[1].value;
    }

    parseTElement(weatherElement){
        const dayNight = parseDate(Date.parse(weatherElement.startTime)).dayNight;
        this[dayNight].temperature = weatherElement.elementValue[0].value;
    }
};