import React from 'react'

const Future = () => {
  const daily = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  return (
    <div className='future'>
      <div className='future-subhead'>
        <p>ICON</p>
        <p className='sm'>5-Day Forecast</p>
      </div>
      <div className='daily-container'>
        {daily.map((item) => (
          <>
            <hr></hr>
            <div className='daily-row'>
              <p>{item}</p>
              <p>SVG 58&deg;/45&deg;</p>
              <p>Sunny</p>
              <p>SVG 5%</p>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default Future;