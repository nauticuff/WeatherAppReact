import { useState } from 'react';
import Nav from './Nav';
import Weather from './Weather';

const Wrapper = () => {
  const [isLocationEnabled, setIsLocationEnable] = useState(false);
  const [blur, setBlur] = useState('blurred');

  const [futureDay, setFutureDay] = useState(['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']); 
  const [futureIcon, setFutureIcon] = useState(['01d', '02d', '03d', '09d', '01d', '13d']);
  const [futureHigh, setFutureHigh] = useState([65, 62, 70, 59, 60, 63]);
  const [futureLow, setFutureLow] = useState([57, 55, 45, 49, 50, 52]);
  const [futureDescription, setFutureDescription] = useState(['Sunny','Overcast','Cloudy','Rainy','Sunny','Snow',]);
  const [futurePrecipitation, setFuturePrecipitation] = useState([0, 4, 25, 62, 2, 40])
  


  const [] = useState([]);

  const createHandleChange = (setter) => {
    return function handleChange(newValue) {
      setter(newValue);
    };
  }

  const handleLocationChange = (newValue) => {
    if(newValue === false){
      setBlur("");
    }
  }

  const renderFutureDay = createHandleChange(setFutureDay);
  const renderFutureIcon = createHandleChange(setFutureIcon);
  const renderFutureHigh = createHandleChange(setFutureHigh);
  const renderFutureLow = createHandleChange(setFutureLow);
  const renderFutureDescription = createHandleChange(setFutureDescription);
  const renderFuturePrecipitation = createHandleChange(setFuturePrecipitation);

  const [description, setDescription] = useState('Sunny');
  const [icon, setIcon] = useState('04d')
  const [currentTemp, setCurrentTemp] = useState(65);
  const [today, setToday] = useState('Mon');
  const [highTemp, setHighTemp] = useState(90);
  const [lowTemp, setLowTemp] = useState(-20);
  const [name, setName] = useState('Stockton');
  const [sunsetTime, setSunsetTime] = useState(1679537879);
  const [lat, setLat] = useState(10);
  const [lon, setLon] = useState(20);

  const currentInfo = [description, icon, currentTemp, today, highTemp, lowTemp, name, sunsetTime, lat, lon];
  const forecastInfo = [futureDay, futureIcon, futureHigh, futureLow, futureDescription, futurePrecipitation];

  const handleDescriptionChange = createHandleChange(setDescription);
  const handleIconChange = createHandleChange(setIcon);
  const handleCTempChange = createHandleChange(setCurrentTemp);
  const handleTodayChange = createHandleChange(setToday);
  const handleHTempChange = createHandleChange(setHighTemp);
  const handleLTempChange = createHandleChange(setLowTemp);
  const handleNameChange = createHandleChange(setName);
  const handleSunsetChange = createHandleChange(setSunsetTime);
  const handleLatChange = createHandleChange(setLat);
  const handleLonChange = createHandleChange(setLon);

  return (
    <div className={`h-screen bg-sky-400 py-5 ${blur}`}>
        <div className='wrapper-width mx-auto'>
          <Nav location={isLocationEnabled} locationChange={handleLocationChange} currentInfo={currentInfo} 
            onDescriptionChange={handleDescriptionChange} onIconChange={handleIconChange} onCTempChange={handleCTempChange} onTodayChange={handleTodayChange} onHTempChange={handleHTempChange} onLTempChange={handleLTempChange} onNameChange={handleNameChange} onSunsetChange={handleSunsetChange} onLatChange={handleLatChange} onLonChange={handleLonChange}
              forecastInfo={forecastInfo} 
            handleDayChange={renderFutureDay} handleIconListChange={renderFutureIcon} handleHighChange={renderFutureHigh} handleLowChange={renderFutureLow} handleDescriptionListChange={renderFutureDescription} handlePrecipitationChange={renderFuturePrecipitation} 
          />
          <Weather currentInfo={currentInfo} forecastInfo={forecastInfo}/> 
        </div>
    </div>
  );
}

export default Wrapper;