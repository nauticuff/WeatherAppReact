import React from 'react'

const Current = () => {

  const hourly = [55,57,60,58,57,56,55];

  return (
    <div className='current'>
      <div className='current-top'>
        <p>Stockton</p>
        <h1>60&deg;</h1>
        <p>Sunny</p>
        <p>H: 65&deg; L: 45&deg;</p>
      </div>
      <div className='buttons'>
        <button className='star'>Favorite</button>
        <button className='list'>Favorite List</button>
      </div>
      <div className='hourly-container'>
        {hourly.map((item) => (
          <div className='hourly-row'>
            <p>Now</p>
            <p>{item} &deg;</p>
            <p>Sunny</p>
            <p>Sunny Svg</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Current