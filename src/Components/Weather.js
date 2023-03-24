import Current from "./Current";
import Future from "./Future";

const Weather = ({currentInfo, forecastInfo}) => {
  return (
    <div className='content-container'>
        <Current currentInfo={currentInfo} forecastInfo={forecastInfo}/>
        <Future currentInfo={currentInfo} forecastInfo={forecastInfo}/> 
    </div>
  )
}

export default Weather;