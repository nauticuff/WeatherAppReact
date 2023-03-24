import { useRef, useState, useEffect } from "react";
import { Autocomplete } from '@react-google-maps/api';
import { getCurrentWeather, getForecastWeather } from '../Logic/Fetch.js'
import { Modal } from "react-bootstrap";
import { toggleSaveToLocalStorage, getLocalStorage } from "../Logic/Favorite.js";
//import Autocomplete from 'google-map-react/lib/components/places/Autocomplete';
// import 'react-bootstrap';

const Nav = (props) => {
  const [autocomplete, setAutocomplete] = useState(null);
  const inputRef = useRef(null);
  const [futureDay, setFutureDay] = useState([]);
  const [futureHi, setFutureHi] = useState([]);
  const [futureLo, setFutureLo] = useState([]);
  const [futureIcon, setFutureIcon] = useState([]);
  const [futureDescription, setFutureDescription] = useState([]);
  const [futureRain, setFutureRain] = useState([]);

  const [smShow, setSmShow] = useState(false);

  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = async () => {
    if (autocomplete == null) return
    const place = autocomplete.getPlace();
    const latitude = place.geometry.location.lat();
    const longitude = place.geometry.location.lng();
    let data = await getCurrentWeather(latitude, longitude);
    console.log(data);
    let parsedData = parseCurrentWeather(data);

    let data2 = await getForecastWeather(latitude, longitude);
    console.log(data2);
    let parsedData2 = parseDaily(data2);
    
    props.onDescriptionChange(parsedData.Description);
    props.onCTempChange(parsedData.currentTemp)
    props.onIconChange(parsedData.Icon);
    props.onCTempChange(parsedData.currentTemp);
    props.onHTempChange(parsedData.highTemp);
    props.onLTempChange(parsedData.lowTemp);
    props.onNameChange(parsedData.name);
    props.onSunsetChange(parsedData.sunsetTime);
    props.onLatChange(parsedData.lat);
    props.onLonChange(parsedData.lon);

    const minLow = calculateMinTemp(parsedData2);
    const minHigh = calculateMaxTemp(parsedData2);
    const iconList = calculateMostCommonIcon(parsedData2);
    const descriptionList = calculateCommonDailyDescription(parsedData2);
    const precipitationList = calculateAverageRain(parsedData2);

    const newFutureDay = futureDay.slice();
    const newFutureLo = futureLo.slice();
    const newFutureHi = futureHi.slice();
    const newFutureIcon = futureIcon.slice();
    const newFutureDescription = futureDescription.slice();
    const newFutureRain = futureRain.slice();

    for (const day in minLow) {
      newFutureDay.push(day);
      newFutureLo.push(minLow[day]);
    }

    for(const day in minHigh){
      newFutureHi.push(minHigh[day]);
    }

    for(const icon in iconList){
      newFutureIcon.push(iconList[icon]);
    }

    for(const description in descriptionList){
      newFutureDescription.push(descriptionList[description]);
    }

    for(const precipitation in precipitationList){
      newFutureRain.push(precipitationList[precipitation]);
    }

    props.handleDayChange(newFutureDay);
    props.handleDescriptionListChange(newFutureDescription);
    props.handleHighChange(newFutureHi);
    props.handleLowChange(newFutureLo);
    props.handleIconListChange(newFutureIcon);
    props.handlePrecipitationChange(newFutureRain);
  };

  function parseCurrentWeather({ main, name, dt, weather, sys, coord }) {
    const {
      temp: currentTemp,
      temp_min: lowTemp,
      temp_max: highTemp,

    } = main

    const {
      main: Description,
      icon: Icon,
    } = weather[0]

    const {
      sunrise: sunriseTime,
      sunset: sunsetTime,

    } = sys

    const {
      lat,
      lon
    } = coord

    return {
      currentTemp: Math.round(((currentTemp - 273.15) * (9 / 5)) + 32),
      highTemp: Math.round(((highTemp - 273.15) * (9 / 5)) + 32),
      lowTemp: Math.round(((lowTemp - 273.15) * (9 / 5)) + 32),
      name,
      dt,
      Description,
      Icon,
      sunriseTime,
      sunsetTime,
      lat,
      lon
    }
  }

  function parseDaily({ list }) {
    return list.map((index) => {

      const {
        main: dailyDescription,
        icon: dailyIcon
      } = index.weather[0]

      //const main = index.weather[0].main

      const {
        temp_min: dailyLo,
        temp_max: dailyHi,
        temp: tempNow,
      } = index.main

      const {
        dt: time
      } = index

      const {
        pop: precipitation
      } = index;

      return {
        dailyDescription,
        dailyIcon,
        dailyLo: Math.round(((dailyLo - 273.15) * (9 / 5)) + 32),
        dailyHi: Math.round(((dailyHi - 273.15) * (9 / 5)) + 32),
        tempNow: Math.round(((tempNow - 273.15) * (9 / 5)) + 32),
        time,
        precipitation: precipitation * 100
      }
    })
  }

  let parsedData2 = '';
  let today;

  const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
  })

  const positionSuccess = async ({ coords }) => {
    let data = await getCurrentWeather(coords.latitude, coords.longitude);
    let parsedData = parseCurrentWeather(data);
    console.log(parsedData);
    let data2 = await getForecastWeather(coords.latitude, coords.longitude);
    parsedData2 = parseDaily(data2);
    //console.log(data2)
    today = DAY_FORMATTER.format(parsedData.dt * 1000);

    props.onDescriptionChange(parsedData.Description);
    props.onCTempChange(parsedData.currentTemp)
    props.onIconChange(parsedData.Icon);
    props.onCTempChange(parsedData.currentTemp);
    props.onTodayChange(today);
    props.onHTempChange(parsedData.highTemp);
    props.onLTempChange(parsedData.lowTemp);
    props.onNameChange(parsedData.name);
    props.onSunsetChange(parsedData.sunsetTime);
    props.onLatChange(parsedData.lat);
    props.onLonChange(parsedData.lon);

    const minLow = calculateMinTemp(parsedData2);
    const minHigh = calculateMaxTemp(parsedData2);
    const iconList = calculateMostCommonIcon(parsedData2);
    const descriptionList = calculateCommonDailyDescription(parsedData2);
    const precipitationList = calculateAverageRain(parsedData2);

    const newFutureDay = futureDay.slice();
    const newFutureLo = futureLo.slice();
    const newFutureHi = futureHi.slice();
    const newFutureIcon = futureIcon.slice();
    const newFutureDescription = futureDescription.slice();
    const newFutureRain = futureRain.slice();

    for (const day in minLow) {
      newFutureDay.push(day);
      newFutureLo.push(minLow[day]);
    }

    for(const day in minHigh){
      newFutureHi.push(minHigh[day]);
    }

    for(const icon in iconList){
      newFutureIcon.push(iconList[icon]);
    }

    for(const description in descriptionList){
      newFutureDescription.push(descriptionList[description]);
    }

    for(const precipitation in precipitationList){
      newFutureRain.push(precipitationList[precipitation]);
    }

    props.handleDayChange(newFutureDay);
    props.handleDescriptionListChange(newFutureDescription);
    props.handleHighChange(newFutureHi);
    props.handleLowChange(newFutureLo);
    props.handleIconListChange(newFutureIcon);
    props.handlePrecipitationChange(newFutureRain);
    
    props.locationChange(smShow);
  }

  const positionError = () => {
    setSmShow(true);
    //props.locationChange(smShow);
    
    //alert("Please enable location to get weather")
  }

  function calculateMinTemp(data) {
    const result = {};

    data.forEach(obj => {
      const day = DAY_FORMATTER.format(obj.time * 1000);
      const dailyLo = obj.dailyLo;

      if (!result[day] || dailyLo < result[day]) {
        result[day] = dailyLo;
      }
    });

    return result;
  }

  function calculateMaxTemp(data) {
    const result = {};

    data.forEach(obj => {
      const day = DAY_FORMATTER.format(obj.time * 1000);
      const dailyHi = obj.dailyHi;

      if (!result[day] || dailyHi > result[day]) {
        result[day] = dailyHi;
      }
    });

    return result;
  }

  function calculateMostCommonIcon(data) {
    const result = {};
  
    data.forEach(obj => {
      const day = DAY_FORMATTER.format(obj.time * 1000);
      const dailyIcon = obj.dailyIcon;
  
      if (!result[day]) {
        result[day] = {};
      }
  
      if (!result[day][dailyIcon]) {
        result[day][dailyIcon] = 1;
      } else {
        result[day][dailyIcon]++;
      }
    });
  
    const maxDailyIconsByDay = {};
  
    for (const day in result) {
      let maxDailyIcon = null;
      let maxCount = 0;
  
      for (const dailyIcon in result[day]) {
        const count = result[day][dailyIcon];
  
        if (count > maxCount) {
          maxDailyIcon = dailyIcon;
          maxCount = count;
        }
      }
  
      maxDailyIconsByDay[day] = maxDailyIcon;
    }
  
    return maxDailyIconsByDay;
  }

  function calculateCommonDailyDescription(data) {
    const result = {};
  
    data.forEach(obj => {
      const day = DAY_FORMATTER.format(obj.time * 1000);
      const dailyDescription = obj.dailyDescription;
  
      if (!result[day]) {
        result[day] = {};
      }
  
      if (!result[day][dailyDescription]) {
        result[day][dailyDescription] = 1;
      } else {
        result[day][dailyDescription]++;
      }
    });
  
    const maxDailyDescriptionsByDay = {};
  
    for (const day in result) {
      let maxDailyDescription = null;
      let maxCount = 0;
  
      for (const dailyDescription in result[day]) {
        const count = result[day][dailyDescription];
  
        if (count > maxCount) {
          maxDailyDescription = dailyDescription;
          maxCount = count;
        }
      }
  
      maxDailyDescriptionsByDay[day] = maxDailyDescription;
    }
  
    return maxDailyDescriptionsByDay;
  }

  function calculateAverageRain(data) {
    const avgRainByDay = {};
  
    for (const obj of data) {
      const day = DAY_FORMATTER.format(obj.time * 1000);

      if (!avgRainByDay[day]) {
        avgRainByDay[day] = {
          count: 0,
          sum: 0,
        };
      }
      avgRainByDay[day].count++;
      avgRainByDay[day].sum += obj.precipitation;
    }
  
    const result = {};
    for (const day of Object.keys(avgRainByDay)) {
      const avg = avgRainByDay[day].sum / avgRainByDay[day].count;
      result[day] = Math.round(avg);
    }
  
    return result;
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(positionSuccess, positionError);
  }, []);

  return (
    <div className='navi'>
      {/* Modal which is broken away from the document flow*/}
      <Modal
        show={smShow}
        backdrop="static"
        centered
        onHide={() => setSmShow(false)}
      >
        <Modal.Header>
          <Modal.Title>
            Location Disabled
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Please enable location and refresh the page to get weather information.</Modal.Body>
      </Modal>
      {/* //////////// */}
      <div>
        <img className="logo" onClick={() => window.location.reload()} src={require('../Assets/Logo2.png')} />
      </div>
      {/* <div className="search-bar">
          <input ref={inputRef} type='text' placeholder='Enter a location'></input>
          <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.99215 1.873C6.70815 1.873 4.85015 3.739 4.85015 6.033C4.85015 8.327 6.70815 10.193 8.99215 10.193C11.2762 10.193 13.1342 8.327 13.1342 6.033C13.1342 3.739 11.2762 1.873 8.99215 1.873ZM4.52515 10.053C3.57115 8.985 2.98415 7.578 2.98415 6.033C2.98415 2.706 5.67915 0 8.99115 0C12.3032 0 14.9982 2.707 14.9982 6.033C14.9982 9.36 12.3032 12.066 8.99115 12.066C7.88815 12.066 6.85815 11.761 5.96915 11.238L1.64215 16.337C1.45715 16.554 1.19515 16.666 0.932151 16.666C0.717151 16.666 0.502151 16.593 0.327151 16.442C-0.0648491 16.106 -0.110849 15.515 0.223151 15.122L4.52515 10.053Z" fill="#F2F2F2"></path>
          </svg>
        </div> */}
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input onFocus={e => e.target.select()} className="search-bar" ref={inputRef} type="text" placeholder="Enter a location" />
      </Autocomplete>
    </div>
  );
}

export default Nav;
