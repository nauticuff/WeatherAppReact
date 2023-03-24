import React, { useEffect, useState } from 'react';
import { toggleSaveToLocalStorage, getLocalStorage } from '../Logic/Favorite'
import { Modal, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import StarEmpty from '../Assets/StarEmpty.svg'
import StarFull from '../Assets/StarFull.svg'
import List from '../Assets/List.svg'

const Current = ({ currentInfo }) => {
  const [show, setShow] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [starIcon, setStarIcon] = useState(StarEmpty);

 
  const handleList = () => {
    show === false ? setShow(true) : setShow(false);
  }

  return (
    <div className='current'>
      <div className='current-top'>
        <p>{currentInfo[6]}</p>
        <h1>{currentInfo[2]} &deg;F</h1>
        <p>{currentInfo[0]}</p>
        <p>H: {currentInfo[4]}&deg; L: {currentInfo[5]}&deg;</p>
      </div>
      <div className='buttons'>
        <button className='button-content'>
          <span>Favorite</span>
          <img src={starIcon} alt='outline of a star'></img>
        </button>
        <button onClick={() => handleList()} className='button-content'>
          <span>Favorite List</span>
          <img src={List} alt='bookmark svg'></img>
        </button>
      </div>

      <Modal show={show} onHide={() => handleList()}>
        <Modal.Header closeButton>
          <Modal.Title>Your Favorites</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {/* {favorites.map((location, index) => {
            return (
              <ListGroup.Item className='location-item' key={`list-item-${index}`}>{favorites.favorites}</ListGroup.Item>
            );
          })} */}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>
      <div className='hourly-container'>
        {/* {hourly.map((item, index) => (
          <div key={`hourly-row-${index}`} className='hourly-row'>
            <p>Now</p>
            <p>{item} &deg;</p>
            <p>Sunny</p>
            <img src={`https://openweathermap.org/img/wn/${props.icon}.png`}></img>
          </div>
        ))} */}
        <div className='hourly-row'>
          <p>Now</p>
          <p>{currentInfo[2]} &deg;F</p>
          <p>{currentInfo[0]}</p>
          <img src={`https://openweathermap.org/img/wn/${currentInfo[1]}.png`}></img>
        </div>
      </div>
    </div>
  );
}

export default Current